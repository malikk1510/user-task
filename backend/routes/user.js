const express = require('express');
const app = express();
const router = express.Router();
const { check } = require('express-validator');

//controllers
const {signup,validationFunction,signin,deleteUser,updateUser} = require('../controllers/user');
const auth = require('../middlewares/auth')

//routes
//signup
router.post('/signup', [
    check('email', 'Invalid email').isEmail(),
    check('name', 'name should be atleast 3 character').isLength({ min: 3 }),
    check('password', 'Password length should be atleast 5 characters').isLength({ min: 5 })
],validationFunction ,signup);

//signin
router.post('/signin', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password length should be atleast 5 characters').isLength({ min: 5 })
],validationFunction ,signin);



//Authenticated routes

// app.use(auth);//auth-middleware

//delete
router.delete('/deleteUser',auth,deleteUser);

//update
router.patch('/updateUser',auth,updateUser);


//export
module.exports=router