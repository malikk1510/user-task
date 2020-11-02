const express = require('express');
const app = express();
const router = express.Router();
const { check } = require('express-validator');

//controllers
const {signup,validationFunction,signin,deleteUser,updateUser,signout} = require('../controllers/user');
const auth = require('../middlewares/auth')

//routes
//signup
router.post('/api/home/signup', [
    check('email', 'Invalid email').isEmail(),
    check('name', 'name should be atleast 3 character').isLength({ min: 3 }),
    check('password', 'Password length should be atleast 4 characters').isLength({ min: 4 })
],validationFunction ,signup);

//signin
router.post('/api/home/signin', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password length should be atleast 5 characters').isLength({ min: 5 })
],validationFunction ,signin);


//Signout route
router.get('/api/auth/signout',  signout);

//Authenticated routes

// app.use(auth);//auth-middleware

//exceptional routes
//delete
router.delete('/api/auth/deleteUser',auth,deleteUser);

//update
router.patch('/api/auth/updateUser',auth,updateUser);


//export
module.exports=router