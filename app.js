const inquirer = require("inquirer");
const mysql = require("mysql");
const conTable = require("console.table");
//const questions = require("./develop/queries/questions");
const {
  addDepartment,
  addRole,
  addEmployee,
} = require("./develop/queries/addQueries");

const {
  viewDepartments,
  viewRoles,
  viewEmployees,
} = require("./develop/queries/viewQueries");

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
  endConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    //console.log(res);
    //connection.end();
  });
}

function start() {
  inquirer
    .prompt({
      type: "list",
      message: "Please select an action:",
      name: "chooseAction",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Department",
        "Update Role",
        "Update Employee",
        "Exit",
      ],
    })
    .then((reply) => {
      console.log("this is app start.then");
      if (reply.chooseAction === "Add Department") {
        addDepartment();
      } else if (reply.chooseAction === "Add Role") {
        addRole();
      } else if (reply.chooseAction === "Add Employee") {
        addEmployee();
      } else if (reply.chooseAction === "View Departments") {
        viewDepartments();
      } else if (reply.chooseAction === "View Roles") {
        viewRoles();
      } else if (reply.chooseAction === "View Employees") {
        viewEmployees();
      } else {
        console.log("this response has not been written yet");
      }
    });
}

function endConnection() {
  console.log("about to end connection");
  connection.end;
}
