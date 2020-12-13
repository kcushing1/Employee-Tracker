const Role = require("../lib/role");
const Employee = require("../lib/employee");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

//import employeesDB data
//check activity and notes on doing this

const otherQs = [
  {
    type: "input",
    message: "What is the new department?",
    name: "dept",
    when: (answers) => answers.action === "Add Department",
  },
  {
    type: "input",
    message: "this is a dept test",
    name: "depttest",
    when: (answers) => answers.action === "Add Department",
  },
  ,
  {
    type: "input",
    message: "What is the new employee's first name?",
    name: "first_name",
    when: (answers) => answers.action === "Add Employee",
  },
  {
    type: "input",
    message: "What is the new employee's last name?",
    name: "last_name",
    when: (answers) => answers.action === "Add Employee",
  },
  {
    type: "input",
    message: "What is the employees role?",
    name: "role_emp",
    when: (answers) => answers.action === "Add Employee",
  },
  {
    type: "confirm",
    message: "Does this employee have a manager?",
    name: "managerConfirm",
    when: (answers) => answers.action === "Add Employee",
  },
  {
    type: "input",
    message: "What is the manager's first name?",
    name: "managerFirst",
    when: "managerConfirm",
  },
  {
    type: "input",
    message: "What is the manager's last name?",
    name: "managerLast",
    when: "managerConfirm",
  },
  {
    type: "input",
    message: "What is the manager's first name?",
    name: "managerFirst",
    when: "managerConfirm",
  },
  {
    type: "input",
    message: "What is the manager's last name?",
    name: "managerLast",
    when: "managerConfirm",
  },
];

module.exports = {
  initQuestion,
};

//module.exports = {
//function1,
//function2
//}

//then to call it in other file:
//var myFtns = require("filepath")
//myFtns.function1 ...

//OR

//to call it in other file
//const {function1, function2} = require("filepath")
//then ftns can be called directly
