CREATE DATABASE IF NOT EXISTS job_application_v2;
USE job_application_v2;


CREATE TABLE IF NOT EXISTS job_applicants (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email_address VARCHAR(200) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL, 
    date_of_birth DATE NOT NULL,
    applied_designation VARCHAR(100) NOT NULL, 
    relationship_status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_applicant_id PRIMARY KEY(id),
    CONSTRAINT uq_applicants_email UNIQUE(email_address)
);


CREATE TABLE IF NOT EXISTS applicants_address (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    first_line VARCHAR(200) NOT NULL,
    second_line VARCHAR(200),
    applicant_city VARCHAR(50) NOT NULL,
    applicant_state VARCHAR(50) NOT NULL,
    applicant_pincode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_address_id PRIMARY KEY(id),
    CONSTRAINT fk_address_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS education_details (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    course VARCHAR(100) NOT NULL,
    passing_year INT NOT NULL,
    university VARCHAR(500) NOT NULL,
    result DECIMAL(5,2) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_education_id PRIMARY KEY(id),
    CONSTRAINT fk_educations_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS work_experiences (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    designation VARCHAR(100) NOT NULL, 
    from_date DATE NOT NULL,
    to_date DATE, 
    annual_package INT UNSIGNED NOT NULL,
    reason_to_leave TEXT,
    ref_contact_name VARCHAR(100),
    ref_contact_number VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_experience_id PRIMARY KEY(id),
    CONSTRAINT fk_experiences_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS job_references (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    reference_name VARCHAR(100) NOT NULL,
    reference_contact VARCHAR(20) NOT NULL,
    relation VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_reference_id PRIMARY KEY(id),
    CONSTRAINT fk_references_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);


CREATE TABLE IF NOT EXISTS technologies_known (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    technology_name VARCHAR(100) NOT NULL,
    is_beginner TINYINT(1) NOT NULL DEFAULT 0,
    is_advance TINYINT(1) NOT NULL DEFAULT 0,
    is_expert TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_technology_id PRIMARY KEY(id),
    CONSTRAINT fk_technologies_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS language_known (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    language_name VARCHAR(100) NOT NULL,
    can_speak TINYINT(1) NOT NULL DEFAULT 0,
    can_write TINYINT(1) NOT NULL DEFAULT 0,
    can_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_language_id PRIMARY KEY(id),
    CONSTRAINT fk_languages_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS applicant_preferences (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    prefer_location VARCHAR(100) NOT NULL,
    notice_period INT UNSIGNED NOT NULL,
    expected_ctc INT UNSIGNED NOT NULL,
    current_ctc INT UNSIGNED NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_preference_id PRIMARY KEY(id),
    CONSTRAINT fk_preferences_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

select * from job_applicants;
select * from applicants_address;
select * from education_details;
select * from work_experiences;
select * from applicant_preferences;
select * from job_references;

SET FOREIGN_KEY_CHECKS=0;
truncate table job_applicants;
truncate table applicants_address;
truncate table education_details;
truncate table work_experiences;
truncate table applicant_preferences;
truncate table job_references;
SET FOREIGN_KEY_CHECKS=1;


select * from job_applicants;
select * from applicants_address;
select * from education_details;
select * from work_experiences;
select * from applicant_preferences;
select * from job_references;
select * from language_known;
select * from technologies_known;


SET FOREIGN_KEY_CHECKS=0;
truncate table job_applicants;
truncate table applicants_address;
truncate table education_details;
truncate table work_experiences;
truncate table applicant_preferences;
truncate table job_references;
truncate table language_known;
truncate table technologies_known;
SET FOREIGN_KEY_CHECKS=1;


SELECT * FROM language_known inner join job_applicants on language_known.applicant_id = job_applicants.id;


insert into job_applicants(first_name,last_name,email_address,phone_number,applied_designation,date_of_birth,gender,relationship_status) VALUES('John','Doe','john.doe@example.com','9876543210','Software Engineer','1990-01-01','Male','Single');

insert into applicants_address(applicant_id,first_line,second_line,applicant_city,applicant_state,applicant_pincode) values(4,'123 Main St','Apt 4B','New York','NY','10001');


insert into education_details(applicant_id,course,university,passing_year,result) values(4,'B.Tech','IIT Bombay',2020 , 78.01);


INSERT INTO work_experiences(applicant_id,company_name,designation,from_date,to_date,reason_to_leave,annual_package,ref_contact_name,ref_contact_number) VALUES(4,'Google','Software Engineer','2020-08-01','2023-05-31','Career Growth',1200000,'John Doe','9876543210');


INSERT INTO applicant_preferences(applicant_id,prefer_location,expected_ctc,notice_period,current_ctc,department) VALUES(4,'Bangalore',1500000,'2',1200000,'Designer');

insert into job_references(applicant_id,reference_name,reference_contact,relation) values(4,'Masha','9876543210','Colleague');


insert into language_known (applicant_id,language_name,can_read,can_write,can_speak) values(4,'English',1,1,1);


insert into technologies_known (applicant_id,technology_name,is_beginner,is_advance,is_expert) values(4,'PHP',1,0,0);
