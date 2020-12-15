const mysql = require("mysql");
const inquirer = require("inquirer");
const { queryEmployeeList, queryEmployeeRoles } = require("./listQueries");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

connection.connect((err, res) => {
  if (err) throw err;
  //ftn call here
});

function updateRole() {
  console.log("inside updateRole ftn");
  connection.query("select * from employees,roles", (err, res) => {
    if (err) throw err;
    let employeeList = queryEmployeeList();
    let rolesList = queryEmployeeRoles();
    //IDEALLY: select employee, select new role
    //CAN DO type in employeeID, type in new roleID, set
    console.log(rolesList, employeeList);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an employee to update:",
          name: "updateEmp",
          choices: queryEmployeeList(), //|| [1, 2.3],
        },
        {
          type: "list",
          message: "Select the new role:",
          name: "updateRole",
          choices: queryEmployeeRoles(), //rolesList || [4, 5, 6],
        },
      ])
      .then((reply) => {
        console.log(reply);
        console.log(rolesList, employeeList);
      });
  });
}

module.exports = {
  updateRole,
};
