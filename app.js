const inquirer = require("inquirer");
const mysql = require("mysql");

require("dotenv").config();

const {
  addDepartment,
  addRole,
  addEmployee,
} = require("./develop/queries/addQueries");

const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  viewTeam,
} = require("./develop/queries/viewQueries");

const {
  updateRole,
  updateManager,
} = require("./develop/queries/updateQueries");

const viewBudget = require("./develop/queries/budgetQuery");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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
        "View Department Budget",
        "View Team by Manager",
        "Update Employee's Role",
        "Update Employee's Manager",
        "Exit",
      ],
    })
    .then((reply) => {
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
      } else if (reply.chooseAction === "View Department Budget") {
        viewBudget();
      } else if (reply.chooseAction === "View Team by Manager") {
        viewTeam();
      } else if (reply.chooseAction === "Update Employee's Role") {
        updateRole();
      } else if (reply.chooseAction === "Update Employee's Manager") {
        updateManager();
      } else {
        endConnection();
      }
    });
}

function endConnection() {
  connection.end;
}
