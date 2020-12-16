drop database if exists employeesDB;

create database employeesDB;

use employeesDB;

create table departments(
	id int auto_increment primary key,
    name varchar(30)
);
insert into departments (name)
values ("Placeholder"),("Food Services"), ("Housekeeping"), ("Engineering"), ("Marketing");

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

insert into roles (title, salary, dept_id)
values ("Placeholder",0,1),("Executive Chef", 60000.00,2), ("Director of Housekeeping", 56800.00, 2), ("Manager", 34000, 3), ("Engineer", 60000, 4), ("Sales", 46000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values ("Place","Holder",1,1),("Frodo", "Baggins", 4, 3), ("Harry", "Potter", 3,3), ("Leslie", "Knope", 3, 1)