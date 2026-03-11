create database if not exists student_master;

use student_master;

drop table students;

create table if not exists students(
	id bigint unsigned auto_increment,
    fname varchar(100) not null,
    lname varchar(100) not null,
    email_address varchar(100) not null default "",
    phone_number varchar(20) not null,
    address text not null,
    city varchar(100) not null,
    gender varchar(10) not null,
    date_of_birth date not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
	constraint pk_student_id primary key(id)
);
