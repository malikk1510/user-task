//requiring Task model
const Task = require("../models/task");

//create task
const createTask = async (req, res) => {
  const { title, body, dueDate } = req.body;
  if ((title && body && dueDate) === undefined) {
    return res.status(400).json({ error: "Input fields mustn't be empty!" });
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
  catch (error) {
    res.status(500).json({ error: "Unable to create task!" });
  }
};

//update
const updateTask = async (req, res) => {
  const _id = req.params.id;

  const { title, body, dueDate } = req.body;
  console.log("body", req.body);
  if ((title && body && dueDate) === undefined) {
    return res.status(400).json({ error: "Invalid inputs!" });
  }

  try {
    const task = await Task.findByIdAndUpdate({ _id, owner: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(400).json({
        error: "Task not found in DB!",
      });
    }
    res.json(task);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

//delete
const deleteTask = async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id: _id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({
        error: "Task not found!",
      });
    }
    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//reading tasks by userId
const taskByUserID = async (req, res) => {
  const _id = req.params.id;
  try {
    const tasks = await Task.find({ owner: _id });
    if (tasks.length === 0) {
      return res.status(400).json({ error: "No tasks found!" });
    }
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Unable to find tasks!" });
  }
};

//mark task as completed/incompleted
const markTask = async (req, res) => {
  const { completed } = req.body
  const _id = req.params.id
  if(completed==undefined && completed ==null){
    return res.status(400).json({error:"Invalid inputs!"})
  }
  try {
    const isTask = await Task.findById(_id);
    if(!isTask){
      return res.status(400).json({error:'Task not found in DB!'})
    };
   const task= await Task.findByIdAndUpdate({ _id, owner: req.user._id },{$set:{completed}},{runValidators:true,new:true});
    res.json(task);
  } 
  catch (err) {
    return res.status(500).json({error:'Unable to process the request!'})
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
