insert into departments (name)
values
("Food Services"), 
("Housekeeping"), 
("Engineering"), 
("Marketing");

insert into roles (title, salary, dept_id)
values
("Cook", 40600.00,1), 
("Housekeeping", 41800.00, 2), 
("Manager", 34800, 3), 
("Engineer", 60000, 4), 
("Sales", 46200, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values 
("Frodo", "Baggins", 1, 3), 
("Harry", "Potter", 3,3), 
("Leslie", "Knope", 3, null),
("William", "Shakespeare", 4,2),
("Peter", "Rabbit", 2,2),
("Veronica", "Mars",4,3),
("Darth","Vader",1,3),
("Sam","Adams",5,3)