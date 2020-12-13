const questions = [
  {
    type: "list",
    message: "Please select an action:",
    name: "action",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View Departments",
      "View Roles",
      "View Employees",
      "Update Department",
      "Update Role",
      "Update Employee",
    ],
  },
];

module.exports = questions;
