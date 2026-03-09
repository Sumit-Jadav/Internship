-- 1. Create Database
CREATE DATABASE IF NOT EXISTS job_application;
USE job_application;

-- 2. Main Applicants Table
-- Changed: applied_designation is now a VARCHAR to match your requirement.
CREATE TABLE IF NOT EXISTS job_applicants (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email_address VARCHAR(200) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL, -- Increased size for flexibility
    date_of_birth DATE NOT NULL,
    applied_designation VARCHAR(100) NOT NULL, -- Changed to Text Field
    relationship_status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_applicant_id PRIMARY KEY(id),
    CONSTRAINT uq_applicants_email UNIQUE(email_address)
);

-- 3. Address Details
CREATE TABLE IF NOT EXISTS applicants_address (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    first_line VARCHAR(200) NOT NULL,
    second_line VARCHAR(200), -- Removed NOT NULL as some addresses don't have a 2nd line
    applicant_city VARCHAR(50) NOT NULL,
    applicant_state VARCHAR(50) NOT NULL,
    applicant_pincode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_address_id PRIMARY KEY(id),
    CONSTRAINT fk_address_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);

-- 4. Education Details
CREATE TABLE IF NOT EXISTS education_details (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    passing_year INT NOT NULL,
    university VARCHAR(500) NOT NULL,
    result DECIMAL(5,2) NOT NULL, -- Changed to Decimal for GPA/Percentage accuracy
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_education_id PRIMARY KEY(id),
    CONSTRAINT fk_educations_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);

-- 5. Work Experience
-- Note: designation_id removed and replaced with designation text field
CREATE TABLE IF NOT EXISTS work_experiences (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    designation VARCHAR(100) NOT NULL, -- Changed to Text Field
    from_date DATE NOT NULL,
    to_date DATE, -- NULL allows for "Currently Working"
    annual_package INT UNSIGNED NOT NULL,
    reason_to_leave TEXT,
    ref_contact_name VARCHAR(100),
    ref_contact_number VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_experience_id PRIMARY KEY(id),
    CONSTRAINT fk_experiences_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);

-- 6. Job References
-- Added: applicant_id to link back to the user
CREATE TABLE IF NOT EXISTS job_references (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    applicant_id BIGINT UNSIGNED NOT NULL,
    reference_name VARCHAR(100) NOT NULL,
    reference_contact VARCHAR(20) NOT NULL,
    relation VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_reference_id PRIMARY KEY(id),
    CONSTRAINT fk_references_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);

-- 7. Technologies Known
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
    CONSTRAINT fk_technologies_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);

-- 8. Languages Known
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
    CONSTRAINT fk_languages_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);

-- 9. Applicant Preferences
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
    CONSTRAINT fk_preferences_applicants FOREIGN KEY(applicant_id) REFERENCES job_applicants(id) ON DELETE CASCADE
);
