const mysql = require("mysql");
//const express = require("express");
const bodyParser = require("body-parser");

//var app = express();

var express = require("express");
var app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());
//Configuring express server
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "javalinux",
  database: "api_db",
});
