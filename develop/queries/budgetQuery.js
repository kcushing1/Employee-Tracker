const mysql = require("mysql");
const inquirer = require("inquirer");
const getId = require("../lib/getId");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

function viewBudget() {
  console.log("inside viewBudget ftn");

  connection.query("SELECT * FROM departments", (err, resp) => {
    if (err) throw err;
    const deptArr = function () {
      let deptsArr = [];
      for (let i = 1; i < resp.length; i++) {
        const addDept = resp[i].name + " " + resp[i].id;
        deptsArr.push(addDept);
      }
      return deptsArr;
    };
    console.log(deptArr());
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select a department budget to view:",
          name: "chosenDept",
          choices: deptArr(),
        },
      ])
      .then((ansDep) => {
        console.log("inside .then for choose dept inq");

        const deptId = getId(ansDep.chosenDept);
        console.log("dept id is " + deptId);

        connection.query(
          "SELECT salary FROM roles WHERE dept_id = ?",
          deptId,
          (ers, res) => {
            if (ers) throw ers;
            console.log("inside connection to roles where deptid is");

            const salariesArr = function () {
              let salaryArr = [];
              for (let i = 0; i < res.length; i++) {
                const addSalary = res[i].salary;
                salaryArr.push(addSalary);
              }
              //console.log(rolesArr);
              return salaryArr;
            };
            console.log(salariesArr());

            const budget = addSalaries(salariesArr());

            function addSalaries(arr) {
              return arr.reduce((accum, next) => {
                return (accum += next);
              });
            }
            console.log("the total dept budget is " + budget);
          }
        );
      });
  });
}

module.exports = viewBudget;
