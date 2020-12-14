const Role = require("../lib/role");
const Employee = require("../lib/employee");
const inquirer = require("inquirer");
const mysql = require("mysql");

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
      const deptQuery = connection.query(
        "insert into departments (name) values ('" + reply.addDept + "')",
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
              deptArray.push(res[i].name);
            }
            return deptArray;
          },
        },
      ])
      .then((answer) => {
        console.log("this is .then for addRole");
        console.log("deptRole is " + answer.deptRole);
        const findDeptId = function () {
          for (let i = 0; i < res.length; i++) {
            if (answer.deptRole === res[i].name) {
              console.log("res[i].id is " + res[i].id);
              return res[i].id;
            }
          }
        };

        //create Role from class
        const newRole = new Role(answer.title, answer.salary, findDeptId());

        console.log(newRole);

        //add new role to database
        newRoleToDb(newRole);
      });
  });
}

function addEmployee() {
  console.log("beginning of addEmployee");
  connection.query(
    "select * from roles inner join employees on roles.id = employees.role_id where roles.title = 'Manager'",
    (err, res) => {
      if (err) throw err;
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
            type: "input",
            message: "What is the employee's role?",
            name: "roleEmp",
          },
          {
            type: "confirm",
            message: "Does this employee have a manager?",
            name: "managerConfirm",
          },
          {
            type: "list",
            message: "Please select a manager:",
            name: "empManager",
            choices: function () {
              let managersArray = [];
              for (let i = 0; i < res.length; i++) {
                const newManager = res[i].first_name + " " + res[i].last_name;
                managersArray.push(newManager);
              }
              return managersArray;
            },
            when: (answers) => answers.managerConfirm === true,
          },
        ])
        .then((reply) => {
          console.log("the .then for addEmployee");

          const findMngId = function () {
            for (let i = 0; i < res.length; i++) {
              if (
                reply.empManager &&
                reply.empManager.includes(res[i].last_name)
              ) {
                console.log(
                  "empManager is " +
                    reply.empManager +
                    "and the db manager is " +
                    res[i].last_name
                );
                let mangId = res[i].id;
                return mangId;
              } else {
                return 0;
              }
            }
          };

          console.log(findMngId());
          console.log(reply.roleEmp);

          let replyRole = reply.roleEmp;
          let roleId = getRoleId(replyRole);
          let mngId = findMngId();

          //create Role from class
          //partialEmp = [reply.firstName, reply.lastName, replyRole, mngId];

          //console.log(partialEmp);

          //return partialEmp;
          //let roleId = getRoleId(partialEmp[3]);
          const newEmployee = new Employee(
            reply.firstName,
            reply.lastName,
            roleId,
            mngId
          );
          console.log(newEmployee);
        });
    }
  );
  //call ftn to push to db
  newEmployeeToDb();
}

function newEmployeeToDb() {
  console.log("newEmployeeToDb function");
}

function newRoleToDb(role) {
  connection.query("insert into roles set ?", role, function (err, res) {
    if (err) throw err;
    console.log("a new role was added");
  });
}

function getRoleId(role) {
  const roleQuery = "select * from roles where title = '" + role + "'";
  console.log("inside getRoleId and " + roleQuery);
  connection.query(roleQuery, function (err, resp) {
    if (err) throw err;
    console.log("inside role query");
    console.log(resp[0].id);
    if (resp[0].id) {
      console.log("inside the getRole if statement");
      const selectedId = resp[0].id;
      console.log(selectedId);
      return selectedId;
    } else {
      console.log("That role does not exist. Please add role.");
    }
  });
}

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
