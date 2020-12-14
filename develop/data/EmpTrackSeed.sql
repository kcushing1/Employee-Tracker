insert into departments (name)
values ("Food Services"), ("Housekeeping"), ("Engineering"), ("Marketing")

insert into roles (title, salary, dept_id)
values ("Executive Chef", 60000.00,1), ("Director of Housekeeping", 56800.00, 2), ("Manager", 34000, 3), ("Engineer", 60000, 4), ("Sales", 46000, 3)

insert into employees (first_name, last_name, role_id, manager_id)
values ("Frodo", "Baggins", 1, 1), ("Harry", "Potter", 3,3), ("Leslie", "Knope", 3, 1)