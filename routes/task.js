const express = require("express");
const app = express();
const router = express.Router();
const { check, query } = require("express-validator");
//controllers
const {
  createTask,
  updateTask,
  deleteTask,
  taskByUserID,
  markTask,
} = require("../controllers/task");
const { validationFunction } = require("../controllers/user");
const auth = require("../middlewares/auth");

//Authenticated routes

// app.use(auth);//auth-middleware

//create task
router.post("/api/auth/createTask", auth, createTask);

//update task
router.patch("/api/auth/updateTask", auth, updateTask);

//delete task
router.delete("/api/auth/deleteTask/:id", auth, deleteTask);

//mark task as completed/incompleted
router.patch("/api/auth/markTask/:id", auth, markTask);

//reading tasks
router.get(
  "/api/auth/taskByuserId",
  query(["_id", "Invalid _id"]).notEmpty(),
  validationFunction,
  taskByUserID
);

//exporting
module.exports = router;
