const Role = require("../lib/role");
const Employee = require("../lib/employee");
const inquirer = require("inquirer");
const mysql = require("mysql");
const capitalize = require("../lib/capitalize");
const getId = require("../lib/getId");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

function addDepartment() {
  console.log("beginning of addDepartment");
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "addDept",
    })
    .then((reply) => {
      console.log(reply.addDept);
      const newDept = capitalize(reply.addDept);
      connection.query(
        "insert into departments (name) values ('" + newDept + "')",
        (err, res) => {
          if (err) throw err;
          console.log("dept added...probably");
        }
      );
    });
}

function addRole() {
  console.log("beginning of addRole()");
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new role title?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department is this role in?",
          name: "deptRole",
          choices: function () {
            let deptArray = [];
            for (let i = 0; i < res.length; i++) {
              let newDept = res[i].name + " " + res[i].id;
              deptArray.push(newDept);
            }
            return deptArray;
          },
        },
      ])
      .then((answer) => {
        console.log("this is .then for addRole");
        console.log("deptRole is " + answer.deptRole);

        const findDeptId = getId(answer.deptRole);

        const newTitle = capitalize(answer.title);

        //create Role from class
        const newRole = new Role(newTitle, answer.salary, findDeptId);

        console.log(newRole);

        //add new role to database
        newRoleToDb(newRole);
      });
  });
}

function addEmployee() {
  console.log("beginning of addEmployee");

  //get roles array from db
  connection.query("SELECT * FROM roles", (err, resp) => {
    if (err) throw err;
    console.log("inside addEmployee.rolesArr query");
    inquirer
      .prompt([
        {
          type: "list",
          message: "What is the employee's role?",
          name: "roleEmp",
          choices: function () {
            let rolesArr = [];
            for (let i = 0; i < resp.length; i++) {
              const addRole = resp[i].title + " " + resp[i].id;
              rolesArr.push(addRole);
            }
            console.log(rolesArr);
            return rolesArr;
          },
        },
      ])
      .then((ans) => {
        console.log(ans.roleEmp);

        connection.query(
          "SELECT * FROM roles INNER JOIN employees ON roles.id = employees.role_id WHERE roles.title = 'Manager'",
          (error, res) => {
            if (error) throw err;

            inquirer
              .prompt([
                {
                  type: "input",
                  message: "What is the new employee's first name?",
                  name: "firstName",
                },
                {
                  type: "input",
                  message: "What is the new employee's last name?",
                  name: "lastName",
                },

                {
                  type: "confirm",
                  message: "Does this employee have a manager?",
                  name: "managerConfirm",
                },
                {
                  type: "list",
                  message: "What is the manager's employee id?",
                  name: "empMngId",
                  choices: function () {
                    let managersArray = [];
                    for (let i = 0; i < res.length; i++) {
                      const newManager =
                        res[i].first_name +
                        " " +
                        res[i].last_name +
                        " " +
                        res[i].id;
                      managersArray.push(newManager);
                    }
                    return managersArray;
                  },
                  when: (answers) => answers.managerConfirm === true,
                },
              ])
              .then((reply) => {
                console.log("the .then for addEmployee");

                let first = capitalize(reply.firstName);
                let last = capitalize(reply.lastName);

                let roleId = getId(ans.roleEmp);
                let mngId = getId(reply.empMngId || "0");

                const newEmployee = new Employee(first, last, roleId, mngId);

                console.log(newEmployee);
                newEmployeeToDb(newEmployee);
              });
          }
        );
      }); //end connectionQuery for rolesArr
  });
}

function newRoleToDb(role) {
  connection.query("INSERT INTO ROLES SET ?", role, function (err, res) {
    if (err) throw err;
    console.log("a new role was added");
  });
}

function newEmployeeToDb(emp) {
  const query = "INSERT INTO EMPLOYEES SET ?";
  connection.query(query, emp, (err, res) => {
    if (err) throw err;
    else {
      console.log("employee added");
    }
  });
}

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
