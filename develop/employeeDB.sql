drop database if exists employeesDB;

create database employeesDB;

use employeesDB;

create table departments(
	id int auto_increment primary key,
    name varchar(30)
);

create table roles(
	id int auto_increment primary key,
    title varchar(30),
    salary decimal(10,2),
    dept_id int
);

create table employees(
	id int auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int null,
    primary key (id)
);

insert into departments (name)
values
("Food Services"), 
("Housekeeping"), 
("Engineering"), 
("Marketing");

insert into roles (title, salary, dept_id)
values
("Executive Chef", 60000.00,1), 
("Director of Housekeeping", 56800.00, 2), 
("Manager", 34000, 3), 
("Engineer", 60000, 4), 
("Sales", 46000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values 
("Frodo", "Baggins", 1, 4), 
("Harry", "Potter", 3,4), 
("Leslie", "Knope", 3, null),
("William", "Shakespeare", 4,4),
("Peter", "Rabbit", 2,2)

