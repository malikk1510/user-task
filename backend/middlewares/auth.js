require("dotenv").config({ path: "../env" });
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//authentication for protected routes
const auth = async (req, res, next) => {
  //middleware function
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); //getting token from hgeaders & deleting bearer from token
    const decoded = jwt.verify(token, process.env.SECRET); // verfying if user have this token
    const user = await User.findOne({ _id: decoded._id }); // fnding user by id, the id we gave while generating tokens
    if (!user) {
      throw new Error("Unauthorized!");
    }
    req.token = token; // storing token in req object so tht we can acces it later
    req.user = user; // storing user in req object so tht we can acces it later
    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate!" });
  }
};
module.exports = auth;
