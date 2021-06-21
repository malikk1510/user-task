const User = require("../models/user");
const { validationResult } = require("express-validator");
const HttpError = require("../models/HttpError");
const { startSession } =require("mongoose");

//Validation error function
const validationFunction = (req, res, next) => {
  const errors = validationResult(req);
  // console.log("errors : ", errors.array());

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid inputs", code: 400, data: errors.array()[0] });
  }
  next();
};

//signup
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log("body: ", req.body);
  var session = await startSession();
  try {
    session.startTransaction();
    const isUser = await User.find({ email }, { session: session });
    // console.log(isUser);
    if (isUser.length >= 1) {
      return next(new HttpError("User already exists!", 400));
    }
    const user = new User(req.body);
    await user.save({ session: session });
    const token = await user.generateAuthToken();
    user.password = undefined;
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ user, token });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    const error = new HttpError("Something went wrong!", 500);
    return next(error);
  }
};

//signin
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    console.log(user);
    if (!user) {
      return next(new HttpError("Invalid user", 400));
    }
    const token = await user.generateAuthToken();
    user.password = undefined;
    res.json({ user, token });
  } catch (err) {
    const error = new HttpError("Invalid user!", 500);
    return next(error);
  }
};

//Sign out logic
const signout = (req, res) => {
  res.json({
    message: "You are successfully logged out!",
  });
};

//delete
const deleteUser = async (req, res, next) => {
  try {
    req.user.remove();
    res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    const error = new HttpError("Unable to delete user!", 500);
    return next(error);
  }
};

//update
const updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  if (updates.length === 0) {
    return next(new HttpError("Input fields mustn't be empty!", 400));
  }
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return next(new HttpError("Invalid updates!", 400));
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await req.user.save();
    req.user.password = undefined;
    return res.status(200).json(user);
  } catch (err) {
    const error = new HttpError("Unable to update user!", 500);
    return next(error);
  }
};

//export
module.exports = {
  signup,
  validationFunction,
  signin,
  deleteUser,
  updateUser,
  signout,
};
