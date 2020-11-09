// require("dotenv").config({path:'../.env'});
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')
const { Schema } = mongoose;

//creating schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic:{
        type:String
    }
  },
  { timestamps: true }
);

//Assigning token to each user!
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() },'newuser');//jwt.verify method is used to verify token we have stored in database!|| key is in json format thts y we used to.String().
  return token;
}

//sign in
userSchema.statics.findByCredentials = async (email, password) => {//by using statics keyword we can make our own method, n these can only be accessed by Model
  const user = await User.findOne({ email });
  if (!user) {
      throw new Error('Invalid user!');
  };
  const isMatch = await bcrypt.compare(password, user.password);//comparing the pass with the pass which is stored in database
  if (!isMatch) {
      throw new Error('Invalid user!');
  };
  return user;
};

//Before saving !
userSchema.pre('save', async function (next) {// we use pre keyword for before work , nd the first param is wht r we doing
  if (this.isModified('password')) {// if we r modifying
      this.password = await bcrypt.hash(this.password, 8);
  };
  next();
});

//Before removing
userSchema.pre('remove', async function (next) {
  const user = this;
 await Task.deleteMany({
     owner:user._id
 })
  next();
});

//..
const User = mongoose.model('User', userSchema);
module.exports=User