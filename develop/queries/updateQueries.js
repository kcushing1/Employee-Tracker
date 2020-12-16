const mysql = require("mysql");
const inquirer = require("inquirer");
const capitalize = require("../lib/capitalize");

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
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "empFirst",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "empLast",
      },
      {
        type: "input",
        message: "What is the employee's new role?",
        name: "newRole",
      },
    ])
    .then((reply) => {
      console.log("inside response from updateRole inquirer");

      connection.query(
        "SELECT * FROM employees FULL JOIN roles on role_id = roles.id",
        (err, res) => {
          if (err) throw err;
          console.log("inside conn.query for updateRole");
          console.table(res);

          let checkRole = capitalize(reply.newRole);
          let empFirst = capitalize(reply.empFirst);
          let empLast = capitalize(reply.empLast);

          console.log(checkRole, empLast, empFirst);

          //filter for role id
          const findRoleId = function () {
            for (let i = 0; i < res.length; i++) {
              if (res[i].title == checkRole) {
                console.log("the " + checkRole + " id is " + res[i].role_id);
                return res[i].role_id;
              }
            }
          };

          console.log(findRoleId());
          //filter for employee id
          const findEmpId = function () {
            for (let j = 0; j < res.length; j++) {
              if (
                res[j].first_name == empFirst &&
                res[j].last_name == empLast
              ) {
                console.log("the employee name is " + empFirst + " " + empLast);
                console.log("the emp id is " + res[j].id);
                return res[j].id;
              }
            }
          };
          console.log(findEmpId());
          updateRoleIdToDb(findEmpId(), findRoleId());
        }
      );
    });
}

function updateRoleIdToDb(empId, roleId) {
  const query = "UPDATE employees SET role_id = ? WHERE id = ?";
  const idsArr = [roleId, empId];
  connection.query(query, idsArr, (err) => {
    if (err) throw err;
    else {
      console.log("role updated");
    }
  });
}

module.exports = {
  updateRole,
};
