const Role = require("../lib/role");
const Employee = require("../lib/employee");

//import employeesDB data
//check activity and notes on doing this

const initQuestion = {
    type: "list",
    message: "Please select an action:",
    name: "action",
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
    ],
  },

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
  {
    type: "input",
    message: "What is the new role title?",
    name: "title",
    when: (answers) => answers.action === "Add Role",
  },
  {
    type: "input",
    message: "What is the salary?",
    name: "salary",
    when: (answers) => answers.action === "Add Role",
  },
  {
    type: "list",
    message: "What department is this role in?",
    name: "dept_role",
    choices: ["x", "y", "z"], //import depts here
    when: (answers) => answers.action === "Add Role",
  },
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
];

module.exports = questions;

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
