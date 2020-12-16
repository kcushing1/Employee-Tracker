const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "omg0hGosh!",
  database: "employeesDB",
});

const rolesList = queryEmployeeRoles();
function queryEmployeeRoles() {
  connection.query("select * from roles", (err, res) => {
    if (err) throw err;
    let rolesArr = [];
    for (let i = 0; i < res.length; i++) {
      const addRole = res[i].title + " " + res[i].id;
      rolesArr.push(addRole);
    }
    //console.log(rolesArr);
    return rolesArr;
  });
}

const employeeList = queryEmployeeList();
function queryEmployeeList() {
  connection.query("select * from employees", (err, res) => {
    if (err) throw err;
    let employeesArr = [];
    for (let i = 0; i < res.length; i++) {
      const nextEmp =
        res[i].first_name + " " + res[i].last_name + " " + res[i].id;
      employeesArr.push(nextEmp);
    }
    // console.log(employeesArr);
    return employeesArr;
  });
}

const departmentList = queryDepartmentList();
function queryDepartmentList() {
  connection.query("select * from departments", (err, res) => {
    if (err) throw err;
    let deptsArr = [];
    for (let i = 0; i < res.length; i++) {
      const nextDept = res[i].name + " " + res[i].id;
      deptsArr.push(nextDept);
    }
    //console.log(deptsArr);
    return deptsArr;
  });
}

module.exports = {
  rolesList,
  employeeList,
  departmentList,
};
