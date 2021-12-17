const mysql = require("mysql");
//const express = require("express");
const bodyParser = require("body-parser");

//var app = express();

var express = require("express");
var app = express();

const cors = require("cors");
const { VAR_STRING } = require("mysql/lib/protocol/constants/types");
app.use(cors());
app.options("*", cors());
//Configuring express server
app.use(bodyParser.json());

var connectionParameters = {
  host: "localhost",
  port: 3308,
  user: "root",
  password: "javalinux",
  database: "api_db",
};

app.get('/learners', (req, res) => {
    var con = mysql.createConnection(connectionParameters);
    con.connect(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected!");
        con.query("SELECT * FROM users", function (err, result, fields) {
          //res.send(JSON.stringify(result));
          res.send(result);
        }); 
      }
      con.end();   
    });
});


//Creating GET Router to fetch all the learner details from the MySQL Database
app.post('/learners', (req, res) => {
    var con = mysql.createConnection(connectionParameters);
    con.connect(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected!");
          var sqlInsert = "INSERT INTO users(name,address) Values('" + req.body.name + "','" + req.body.address + "')";  
          con.query(sqlInsert, function (err, result, fields) {
          if (err != null)    
              res.sendStatus(500)
          else  
             res.sendStatus(200)
          con.end();  
          });
      }
    });
});
 
//Creating Delete Router to fetch all the learner details from the MySQL Database
app.delete('/learners/:id', (req, res) => {
    var con = mysql.createConnection(connectionParameters);
    con.connect(function (err) {
      if (err) {
        console.log(err);
      } else {
        //console.log("Connected!");
          var sqlInsert = "DELETE FROM users where id = " + req.params.id;  
          con.query(sqlInsert, function (err, result, fields) {
          if (err != null)    
              res.sendStatus(500)
          else  
             res.sendStatus(200)
          con.end();  
          }); 
      }   
    });
}); 

//Creating Update Router to fetch all the learner details from the MySQL Database
app.patch('/learners/:id', (req, res) => {
    var con = mysql.createConnection(connectionParameters);
    con.connect(function (err) {
      if (err) {
        console.log(err);
      } else {
        //console.log("Connected!");
          var sqlInsert = "UPDATE users SET NAME='" +  req.body.name + "', ADDRESS = '" + req.body.address +  "'" + " where id = " + req.params.id;  
          con.query(sqlInsert, function (err, result, fields) {
          if (err != null)    
              res.sendStatus(500)
          else  
             res.sendStatus(200)
          con.end();  
          }); 
      }   
    });
}); 




//const myModule = require('./register');
//const res = require("express/lib/response");
//let val = myModule.hello(); // val is "Hello"


//const port = process.env.PORT || 8081;
//app.listen(8081, "127.0.0.1");

 
var server = require("http").createServer(app);
server.listen(5000,'192.168.1.127');