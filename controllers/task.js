//requiring Task model
const Task = require("../models/task");
const HttpError = require('../models/HttpError');

//create task
const createTask = async (req, res,next) => {
  console.log(req.body);
 
  const { title, body, dueDate } = req.body;
  if ((title && body && dueDate) === "" ) {
    return next(
      new HttpError("Input fields mustn't be empty!", 400)
    );
    
  }

  const task = new Task({
    title,
    body,
    dueDate,
    owner: req.user._id,
  });

  try {
  
    const newtask = await task.save();
    res.status(201).json(newtask);
  }
  catch (err) {
    const error = new HttpError(
      'Unable to create task!',
      500
    );
    return next(error);
  }
};

//update
const updateTask = async (req, res,next) => {
  const _id = req.params.id;
  // console.log(req.body);
  const { title, body, dueDate } = req.body.taskData;

  if ((title && body && dueDate) === "") {
    return next(
      new HttpError("Input fields mustn't be empty!", 400)
    );
  }

  try {
   
    const task = await Task.findByIdAndUpdate({ _id:_id, owner: req.user._id }, {
      title,
      body,
      dueDate,
      completed:req.body.body.completed,
      mark:req.body.body.mark}, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(
        new HttpError('Task not found !', 404)
      );
    }
    res.json(task);
  } catch (err) {
    const error = new HttpError(
      'Unable to update task!',
      500
    );
    return next(error);
    
  }
};

//delete
const deleteTask = async (req, res,next) => {
  const _id = req.params.id;
 
  try {
    const task = await Task.findOne({_id:_id,owner:req.user._id});
    if (!task) {
      return next(
        new HttpError('Task not found!', 404)
      );
    }
    task.remove((err,product)=>{
      if(err){
       
        return next(
          new HttpError('Unable to remove task', 500)
        );
      }
      res.json({
        message: "Deleted",
      });
    })
   
  } catch (err) {
    const error = new HttpError(
      'Unable to delete task!',
      500
    );
    return next(error);
   
  }
};

//reading tasks by userId
const taskByUserID = async (req, res,next) => {
  const _id = req.user._id;
 
  try {
    const tasks = await Task.find({ owner: _id });
    res.json(tasks);
  } catch (err) {
    const error = new HttpError(
      'Unable to get task!',
      500
    );
    return next(error);
  
  }
};

//mark task as completed/incompleted
const markTask = async (req, res,next) => {
 
  const { completed,mark } = req.body
  
  const _id = req.params.id
  
  try {
    const isTask = await Task.findById(_id);
    if(!isTask){
      return next(
        new HttpError('Task not found !', 404)
      );
     
    };
   const task= await Task.findByIdAndUpdate({ _id, owner: req.user._id },{$set:{completed,mark}},{runValidators:true,new:true});
    res.json(task);
  } 
  catch (err) {
    const error = new HttpError(
      'Unable to mark task!',
      500
    );
    return next(error);
   
  }
};

//exporting
module.exports = {
  createTask,
  updateTask,
  deleteTask,
  taskByUserID,
  markTask
};
