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

// add sequelize
const { Sequelize, DataTypes } = require("sequelize");
const { ok } = require("assert");
const { response } = require("express");
const sequelize = new Sequelize('api_db', 'root', 'javalinux', {
  host: 'localhost',
  dialect: 'mysql', 
  port: 3308
});



(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();


const Users = sequelize.define(
  "users",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);





var connectionParameters = {
  host: "localhost",
  port: 3308,
  user: "root",
  password: "javalinux",
  database: "api_db",
};

app.get('/learners', (req, res) => {
 
 (async function () {
   try {
     res.send(await Users.findAll({
       attributes: ["id", "name", "address"],
     }));
     console.log("All users");
     //res.send(ok);
   } catch (error) {
     console.error("Error:", error);
   }
 })();

// res.send(Users.findAll())
 return 

  console.log(Users)
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
  /*sequelize
    .sync({
      //force: true
    })
    .then(function () { 
      Users.create(req.body)
    })*/
  
  (async function () {
    try {
      await Users.create(req.body);
      console.log("New user created");
    } catch (error) {
      console.error("Error:", error);
    }
  })();
  
  
  
  
  res.send(req.body)
  return
  const createProduct = async (req, res) => {
    try {
      console.log("start try")
      await Users.create(req.body);
      console.log("success")
      //res.json({
      //  message: "Product Created",
      //});
    } catch (err) {
      console.log("err");
    }
  };
  return;

  var con = mysql.createConnection(connectionParameters);
  con.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected!");
      var sqlInsert =
        "INSERT INTO users(name,address) Values('" +
        req.body.name +
        "','" +
        req.body.address +
        "')";
      con.query(sqlInsert, function (err, result, fields) {
        if (err != null) res.sendStatus(500);
        else {
          res.send(result);
        }
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