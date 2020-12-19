const mysql = require("mysql");
const inquirer = require("inquirer");
const capitalize = require("../lib/capitalize");
const getId = require("../lib/getId");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

function updateRole() {
  connection.query("SELECT * FROM employees", (ers, rep) => {
    if (ers) throw ers;

    //create list of employees to choose from to update
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
        //query and make list of all available roles
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
              //get ids for role and employee
              const findRoleId = getId(reply.newRole);
              const findEmpId = getId(ans.empName);

              //update employee's role ID in DB
              updateRoleIdToDb(findEmpId, findRoleId);
            });
        });
      });
  });
}

function updateRoleIdToDb(empId, roleId) {
  const query = "UPDATE employees SET role_id = ? WHERE id = ?";
  const idsArr = [roleId, empId];
  connection.query(query, idsArr, (err) => {
    if (err) throw err;
    else {
      console.log("Embrace change! You updated a role!");
    }
  });
}

function updateManager() {
  //query to make a list of all employees
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
        //get chosen employee id
        let empId = getId(ans.empName);

        //query for list of all managers
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
                  message: "Please select the new manager:",
                  name: "newMng",
                  choices: makeManagersArr(),
                },
              ])
              .then((reply) => {
                //id for manager; if no manager, default is 0
                let mngId = getId(reply.newMng) || 0;

                updateManagerToDb(empId, mngId);
              });
          }
        );
      });
  });
}

function updateManagerToDb(emp, mng) {
  const query = "UPDATE employees SET manager_id = ? WHERE id = ?";
  const mngArr = [mng, emp];
  connection.query(query, mngArr, (err) => {
    if (err) throw err;
    console.log("Woohoo! This manager has a new teammate!");
  });
}

module.exports = {
  updateRole,
  updateManager,
};
