const inquirer = require("inquirer");
const mysql = require("mysql");
const getId = require("../lib/getId");

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

function viewTeam() {
  console.log("inside viewTeam ftn");
  connection.query(
    "SELECT * FROM roles INNER JOIN employees ON roles.id = employees.role_id WHERE roles.title = 'Manager'",
    (err, res) => {
      if (err) throw err;

      const makeManagersArr = function () {
        let mngArr = [];
        for (let i = 0; i < res.length; i++) {
          const newManager =
            res[i].first_name + " " + res[i].last_name + " " + res[i].id;
          mngArr.push(newManager);
        }
        return mngArr;
      };
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which manager's team would you like to view?",
            name: "chosenMng",
            choices: makeManagersArr,
          },
        ])
        .then((resp) => {
          console.log("the .then for view team inq");
          const mng = getId(resp.chosenMng);
          connection.query(
            "SELECT first_name, last_name, id FROM employees WHERE manager_id = ?",
            [mng],
            (er, rs) => {
              if (er) throw er;
              console.log("inside select manager team display q");
              console.table(rs);
            }
          );
        });
    }
  );
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  viewTeam,
};
