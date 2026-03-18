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


insert into job_applicants(first_name,last_name,email_address,phone_number,applied_designation,date_of_birth,gender,relationship_status) VALUES('Darshit','Jadav','darshit.jadav@example.com','9876543210','Software Engineer','1990-01-01','male','single');

insert into applicants_address(applicant_id,first_line,second_line,applicant_city,applicant_state,applicant_pincode) values(9,'123 Main St','Apt 4B','Bhavnagar','gujarat','10001');


insert into education_details(applicant_id,course,university,passing_year,result) values(8,'B.Tech','IIT Bombay',2020 , 78.01);


INSERT INTO work_experiences(applicant_id,company_name,designation,from_date,to_date,reason_to_leave,annual_package,ref_contact_name,ref_contact_number) VALUES(8,'Foogle','Software Engineer','2020-08-01','2023-05-31','Career Growth',1200000,'John Doe','9876543210');


INSERT INTO applicant_preferences(applicant_id,prefer_location,expected_ctc,notice_period,current_ctc,department) VALUES(8,'Bangalore',1500000,'2',1200000,'Designer');

insert into job_references(applicant_id,reference_name,reference_contact,relation) values(8,'Yu Zong','9876543210','Colleague');


insert into language_known (applicant_id,language_name,can_read,can_write,can_speak) values(8,'English',1,1,1);

insert into technologies_known (applicant_id,technology_name,is_beginner,is_advance,is_expert) VALUES(8,"PHP",1,0,0)

insert into technologies_known (applicant_id,technology_name,is_beginner,is_advance,is_expert) values(6,'PHP',1,0,0),(6,'.NET',0,0,1);



alter table education_details add COLUMN is_deleted TINYINT(1) default  0;
alter Table education_details add COLUMN deleted_at TIMESTAMP NULL;


alter table work_experiences add COLUMN is_deleted TINYINT(1) default 0;
alter table work_experiences add column deleted_at TIMESTAMP NULL;


alter Table job_references add COLUMN is_deleted TINYINT(1) DEFAULT 0;

alter table job_references add column deleted_at TIMESTAMP NULL;

alter table language_known add COLUMN is_deleted TINYINT(1) DEFAULT 0;
alter table language_known add COLUMN deleted_at TIMESTAMP null;


insert into languages(name)values("Hindi"),("English"),("Gujarati");

alter table languages drop COLUMN create_time;


select l.*,lk.*, l.name,IFNULL(lk.can_read,0) as can_read,IFNULL(lk.can_write,0) as can_write,IFNULL(lk.can_speak,0) as can_speak from languages l left join language_known lk on l.name = lk.language_name AND lk.applicant_id = 5;


select l.name,IFNULL(lk.can_read,0) as can_read,IFNULL(lk.can_write,0) as can_write,IFNULL(lk.can_speak,0) as can_speak from languages l left join language_known lk on l.name = lk.language_name AND lk.applicant_id = 5;



insert into skills(name) VALUES('JAVA'),('PYTHON'),('PHP'),('.NET');

select s.name , IFNULL(tk.is_beginner,0) , IFNULL(tk.is_advance,0) , IFNULL(tk.is_expert,0) from skills s LEFT JOIN technologies_known tk on s.name = tk.technology_name AND applicant_id = 4;



SELECT IFNULL(NULL,0) as nullVal;
