const inquirer = require("inquirer");
const mysql = require("mysql");
const getId = require("../lib/getId");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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
  //query for list of managers
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
          const mng = getId(resp.chosenMng);

          //query list of teammates under chosen manager
          connection.query(
            "SELECT first_name, last_name, id FROM employees WHERE manager_id = ?",
            [mng],
            (er, rs) => {
              if (er) throw er;

              //display team as a table
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
