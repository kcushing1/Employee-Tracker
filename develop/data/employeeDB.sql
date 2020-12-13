drop database if exists employeesDB;

create database employeesDB;

use employeesDB;

create table department(
	id int auto_increment primary key,
    name varchar(30)
);

create table role(
	id int auto_increment primary key,
    title varchar(30),
    salary decimal(10,2),
    dept_id int
);

create table employees(
	id int auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int null
)