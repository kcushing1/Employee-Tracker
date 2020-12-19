const Role = require("../lib/role");
const Employee = require("../lib/employee");
const inquirer = require("inquirer");
const mysql = require("mysql");
const capitalize = require("../lib/capitalize");
const getId = require("../lib/getId");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

function addDepartment() {
  //ask for name of new department
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "addDept",
    })
    .then((reply) => {
      //add new department to database
      const newDept = capitalize(reply.addDept);
      connection.query(
        "insert into departments (name) values ('" + newDept + "')",
        (err, res) => {
          if (err) throw err;
          //let user know they were successful
          console.log("Congratulations! You added a new department!");
        }
      );
    });
}

function addRole() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;

    //ask user for new role information
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new role title?",
          name: "title",
        },
        {
          type: "number",
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
        //get department ID from selected department
        const findDeptId = getId(answer.deptRole);
        const newTitle = capitalize(answer.title);

        //create Role from class
        const newRole = new Role(newTitle, answer.salary, findDeptId);

        //add new role to database
        newRoleToDb(newRole);
      });
  });
}

function addEmployee() {
  //get roles array from DB
  connection.query("SELECT * FROM roles", (err, resp) => {
    if (err) throw err;

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
        //query for managers list to chose from
        connection.query(
          "SELECT * FROM roles INNER JOIN employees ON roles.id = employees.role_id WHERE roles.title = 'Manager'",
          (error, res) => {
            if (error) throw err;

            //ask user for new employee's information
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
                //format names, get IDs
                let first = capitalize(reply.firstName);
                let last = capitalize(reply.lastName);

                let roleId = getId(ans.roleEmp);
                let mngId = getId(reply.empMngId || "0");

                //create new employee object
                const newEmployee = new Employee(first, last, roleId, mngId);

                //add employee to DB
                newEmployeeToDb(newEmployee);
              });
          }
        );
      });
  });
}

function newRoleToDb(role) {
  connection.query("INSERT INTO ROLES SET ?", role, function (err, res) {
    if (err) throw err;
    console.log("How exciting! You added a new role!");
  });
}

function newEmployeeToDb(emp) {
  const query = "INSERT INTO EMPLOYEES SET ?";
  connection.query(query, emp, (err, res) => {
    if (err) throw err;
    else {
      console.log("Your company grows! You added a new employee!");
    }
  });
}

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
