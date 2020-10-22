const express = require('express');
const router = express.Router();

//controllers
const {createTask,updateTask,deleteTask,taskByUserID}=require('../controllers/task')
const auth=require('../middlewares/auth')

//routes
//create task
router.post('/createTask',auth,createTask);

//update task
router.patch('/updateTask/:id',auth,updateTask);

//delete task
router.delete('/deleteTask/:id',auth,deleteTask);

//reading tasks
router.get('/taskByuserId/:id',taskByUserID);

//exporting
module.exports=router