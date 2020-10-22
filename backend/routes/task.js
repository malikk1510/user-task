const express = require('express');
const app = express();
const router = express.Router();

//controllers
const { createTask, updateTask, deleteTask, taskByUserID, markTask } = require('../controllers/task')
const auth = require('../middlewares/auth')

//Un-Authenticated routes

//reading tasks
router.get('/taskByuserId/:id', taskByUserID);



//Authenticated routes

// app.use(auth);//auth-middleware

//create task
router.post('/createTask',auth, createTask);

//update task
router.patch('/updateTask/:id',auth, updateTask);

//delete task
router.delete('/deleteTask/:id',auth, deleteTask);

//mark task as completed/incompleted
router.patch('/markTask/:id',auth,markTask)

//exporting
module.exports = router