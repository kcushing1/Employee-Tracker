const mysql = require("mysql");
const conTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

function viewDepartments() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    //display departments as table
    console.table(res);
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    //display roles as table
    console.table(res);
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    //display employees as table
    console.table(res);
  });
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
};
