const mysql = require("mysql");
const inquirer = require("inquirer");
const capitalize = require("../lib/capitalize");
const getId = require("../lib/getId");

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

              //get ids for role and employee
              const findRoleId = getId(reply.newRole);
              const findEmpId = getId(ans.empName);

              console.log(findRoleId);

              console.log(findEmpId);
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
      console.log("role updated");
    }
  });
}

function updateManager() {
  console.log("inside updateManager ftn");
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
        console.log("inside .then of names arr inq");

        //get employee id
        let empId = getId(ans.empName);

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
                console.log("inside .then for inq for choose new mng");
                //.pop manager id
                let mngId = getId(reply.empMngId) || 0;
                //update manager
                console.log(empId, mngId + "are emp & mng ids");
                updateManagerToDb(empId, mngId);
              });
          }
        );
      });
  });
}

function updateManagerToDb(emp, mng) {
  console.log("inside updateManagerToDb");
  console.log(emp, mng);
}

module.exports = {
  updateRole,
  updateManager,
};
