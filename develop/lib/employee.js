class Employee {
  constuctor(first, last, roleId, mangId) {
    (this.first = first),
      (this.last = last),
      (this.roleId = roleId),
      (this.mangId = mangId || 0);
  }
}

module.exports = Employee;
