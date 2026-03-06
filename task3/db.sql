create database if not exists job_application;

create table if not exists job_applicants(
id bigint unsigned auto_increment,
first_name varchar(100) not null,
last_name varchar(100) not null,
email_address varchar(200) not null,
phone_number varchar(20) not null,
gender varchar(6) not null,
date_of_birth date not null,
applied_designation bigint unsigned not null,
relationship_status varchar(8) not null,
created_at timestamp not null default current_timestamp,
updated_at timestamp not null default current_timestamp on update current_timestamp,
constraint pk_applicant_id primary key(id),
constraint uq_applicants_email unique(email_address)
);

create table if not exists applicants_address(
id bigint unsigned auto_increment,
applicant_id bigint unsigned not null,
first_line varchar(200) not null,
second_line varchar(200) not null,
applicant_city varchar(50) not null,
applicant_state varchar(50) not null,
applicant_pincode varchar(6) not null,
created_at timestamp not null default current_timestamp,
updated_at timestamp not null default current_timestamp on update current_timestamp,
constraint pk_address_id primary key(id),
constraint fk_address_applicants foreign key(applicant_id) references job_applicants(id)
);

create table if not exists education_details(
id bigint unsigned auto_increment,
applicant_id bigint unsigned not null,
passing_year int not null,
university varchar(500) not null,
result int not null,
created_at timestamp not null default current_timestamp,
updated_at timestamp not null default current_timestamp on update current_timestamp,
constraint pk_education_id primary key(id),
constraint fk_educations_applicants foreign key(applicant_id) references job_applicants(id)
);

create table if not exists designations(
	id bigint unsigned not null,
    designation varchar(100) not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    constraint pk_designation_id primary key(id)
);

create table if not exists work_experiences(
	id bigint unsigned auto_increment,
    applicant_id bigint unsigned not null,
    company_name varchar(200) not null,
    designation_id bigint unsigned not null,
    from_date date not null,
    to_date date not null,
	annual_package int unsigned not null,
    reason_to_leave text not null,
    ref_contact_name varchar(100) not null,
    ref_contact_number varchar(20) not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    constraint pk_experience_id primary key(id),
    constraint fk_experiences_applicants foreign key(applicant_id) references job_applicants(id)
);


create table if not exists job_reference(
	id bigint unsigned not null,
    reference_name varchar(100) not null,
    reference_contact varchar(20) not null,
    relation varchar(50) not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    constraint pk_reference_id primary key(id)
);

create table if not exists techonologies_known(
	id bigint unsigned auto_increment,
    applicant_id bigint unsigned not null,
    techonology_name varchar(100) not null,
    is_beginner tinyint(1) not null default 0,
    is_advance tinyint(1) not null default 0,
    is_expert tinyint(1) not null default 0,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    constraint pk_techonology_id primary key(id),
	constraint fk_techonologies_applicants foreign key(applicant_id) references job_applicants(id)
);

create table if not exists language_known(
	id bigint unsigned auto_increment,
    applicant_id bigint unsigned not null,
    language_name varchar(100) not null,
    can_speak tinyint(1) not null default 0,
    can_write tinyint(1) not null default 0,
    can_read tinyint(1) not null default 0,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    constraint pk_language_id primary key(id),
    constraint fk_languages_applicants foreign key(applicant_id) references job_applicants(id)
);

create table if not exists applicant_preferences(
	id bigint unsigned auto_increment,
    applicant_id bigint unsigned not null,
    prefer_location varchar(100) not null,
    notice_period int unsigned not null,
    expected_ctc int unsigned not null,
    current_ctc int unsigned not null,
    department varchar(100) not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    constraint pk_preference_id primary key(id),
    constraint fk_preferences_applicants foreign key(applicant_id) references job_applicants(id)
);
