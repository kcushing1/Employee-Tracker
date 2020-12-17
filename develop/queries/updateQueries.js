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

function updateRole() {
  console.log("inside updateRole ftn");

  connection.query("SELECT * FROM employees", (ers, rep) => {
    if (ers) throw ers;
    const makeNamesArr = function () {
      let namesArr = [];
      for (let i = 0; i < rep.length; i++) {
        const addName =
          rep[i].first_name + " " + rep[i].last_name + " " + rep[i].id;
        namesArr.push(addName);
      }
      return namesArr;
    };

    inquirer
      .prompt([
        {
          type: "list",
          message: "Please select an employee:",
          name: "empName",
          choices: makeNamesArr(),
        },
      ])
      .then((ans) => {
        console.log("inside .then for names arr inq");

        connection.query("SELECT * FROM roles", (err, resps) => {
          if (err) throw err;

          const makeRolesArr = function () {
            let rolesArr = [];
            for (let i = 0; i < resps.length; i++) {
              const addRole = resps[i].title + " " + resps[i].id;
              rolesArr.push(addRole);
            }
            return rolesArr;
          };

          inquirer
            .prompt([
              {
                type: "list",
                message: "What is the employee's new role?",
                name: "newRole",
                choices: makeRolesArr(),
              },
            ])
            .then((reply) => {
              console.log("inside response from updateRole inquirer");
              console.log(reply);

              //filter for role id
              const findRoleId = parseInt([...reply.newRole].pop());
              const findEmpId = parseInt([...ans.empName].pop());

              console.log(findRoleId);
              //filter for employee id

              console.log(findEmpId);
              updateRoleIdToDb(findEmpId, findRoleId);
            });
        }); //end names query
      });
  });
}

function updateRoleIdToDb(empId, roleId) {
  const query = "UPDATE employees SET role_id = ? WHERE id = ?";
  const idsArr = [roleId, empId];
  console.log(idsArr);
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
