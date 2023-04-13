const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
require("./database/Db");
require("./models/TaskSchema");
require("./models/UserSchema");

const AuthRoute = require("./Routes/Authentication");
const TaskRoute = require("./Routes/TaskRoutes");

app.use(cors());
//Middleware


// allow OPTIONS on all resources
app.options('*', cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(AuthRoute);
app.use(TaskRoute);

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
