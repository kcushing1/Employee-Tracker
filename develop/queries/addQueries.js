const Role = require("../lib/role");
const Employee = require("../lib/employee");
const Manager = require("../lib/manager");
const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

function addDepartment() {
  console.log("beginning of addDepartment");
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "addDept",
    })
    .then((reply) => {
      console.log(reply.addDept);
      const deptQuery = connection.query(
        "insert into departments (name) values ('" + reply.addDept + "')",
        (err, res) => {
          if (err) throw err;
          console.log("dept added...probably");
        }
      );
    });
}

function addRole() {
  console.log("beginning of addRole()");
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new role title?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department is this role in?",
          name: "deptRole",
          choices: function () {
            let deptArray = [];
            for (let i = 0; i < res.length; i++) {
              deptArray.push(res[i].name);
            }
            return deptArray;
          },
        },
      ])
      .then((answer) => {
        console.log("this is .then for addRole");
        console.log("deptRole is " + answer.deptRole);
        const findDeptId = function () {
          for (let i = 0; i < res.length; i++) {
            if (answer.deptRole === res[i].name) {
              console.log("res[i].id is " + res[i].id);
              return res[i].id;
            }
          }
        };

        //create Role from class
        const newRole = new Role(answer.title, answer.salary, findDeptId());

        console.log(newRole);

        //add new role to database
        newRoleToDb(newRole);
      });
  });
}

function addEmployee() {
  console.log("beginning of addEmployee");

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the new employee's last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the employees role?",
        name: "role_emp",
      },
      {
        type: "confirm",
        message: "Does this employee have a manager?",
        name: "managerConfirm",
      },
      {
        type: "list",
        message: "Please select a manager:",
        name: "empManager",
        choices: ["a", "b", "c"],
      },
    ])
    .then((reply) => {
      console.log("the .then for addEmployee");
      managersList();
      //call ftn to push to db
    });
}

function managersList() {
  console.log("in managersList ftn");
  //select from role by the title, return the role_id
  //select from emp the role_id and return F&L names
  connection.query(
    "select * from roles inner join employees on roles.id = employees.role_id",
    (err, res) => {
      if (err) throw err;
      console.log("inside query for managersList ftn");
      console.log(res);
    }
    //more here
    //search by role.title for manager, return id
    //search join with employees by role id, return f&l
  );
}

function newRoleToDb(role) {
  connection.query("insert into roles set ?", role, function (err, res) {
    if (err) throw err;
    console.log("a new role was added");
  });
}

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
