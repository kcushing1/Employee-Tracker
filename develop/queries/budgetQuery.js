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
  //query for departments array
  connection.query("SELECT * FROM departments", (err, resp) => {
    if (err) throw err;

    //produce departments list
    const deptArr = function () {
      let deptsArr = [];
      for (let i = 1; i < resp.length; i++) {
        const addDept = resp[i].name + " " + resp[i].id;
        deptsArr.push(addDept);
      }
      return deptsArr;
    };

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
        const deptId = getId(ansDep.chosenDept);

        //query for all salaraies in chosen department
        connection.query(
          "SELECT salary FROM roles WHERE dept_id = ?",
          deptId,
          (ers, res) => {
            if (ers) throw ers;

            //create an array of all salaries
            const salariesArr = function () {
              let salaryArr = [];
              for (let i = 0; i < res.length; i++) {
                const addSalary = res[i].salary;
                salaryArr.push(addSalary);
              }
              return salaryArr;
            };

            const budget = addSalaries(salariesArr());

            //add all salaries
            function addSalaries(arr) {
              return arr.reduce((accum, next) => {
                return (accum += next);
              });
            }
            console.log("The total department budget is $ " + budget);
          }
        );
      });
  });
}

module.exports = viewBudget;
