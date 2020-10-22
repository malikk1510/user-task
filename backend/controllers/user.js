const User = require("../models/user");
const {  validationResult } = require("express-validator");

//Validation error function
const validationFunction = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

//signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUser = await User.find({ email });

    if (isUser.length >= 1) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      user.password = undefined;
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(500).json({ error: "Unable to save user!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    user.password = undefined;
    res.json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: "Invalid credentials!" });
  }
};

//delete
const deleteUser = async (req, res) => {
  try {
    req.user.remove();
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    return res.status(500).json({ error: "Unable to delete user!" });
  }
};

//update
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  if (updates.length === 0) {
    return res.status(400).json({ error: "body mustn't be empty!" });
  }
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await req.user.save();
    req.user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Unable to update user!" });
  }
};

//export
module.exports = {
  signup,
  validationFunction,
  signin,
  deleteUser,
  updateUser,
};
