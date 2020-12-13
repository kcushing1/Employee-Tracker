const Role = require("../lib/role");
const Employee = require("../lib/employee");
const inquirer = require("inquirer");
const mysql = require("mysql");

function queries() {
  console.log("the queries.js file is connected");

  function testQuery() {
    console.log("testQuery function works");
  }

  testQuery();
}

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

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
          name: "dept_role",
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
        console.log(answer);
      });
  });
}

module.exports = {
  queries,
  addRole,
};
