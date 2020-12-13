const inquirer = require("inquirer");
const mysql = require("mysql");
const conTable = require("console.table");
const questions = require("./develop/queries/questions");
const queries = require("./develop/queries/queries");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "omg0hGosh!",
  database: "employeesDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  start();
});

require("./develop/queries/queries");

function afterConnection() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.log(res);
    //connection.end();
  });
}

function start() {
  inquirer.prompt(questions).then((reply) => {
    console.log(reply);
    queries();
    connection.end;
  });
}
