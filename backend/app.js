//requiring modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
// const cors = require("cors");
const app = express();

//specifying port
const port = process.env.PORT || 4000;

//setting connection b/w node and database!
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to Database!");

    //setting listening port
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(bodyParser.json());

//routes
app.use(taskRoutes);
app.use(userRoutes);
