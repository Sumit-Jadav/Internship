-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: job_application_v2
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applicant_preferences`
--

DROP TABLE IF EXISTS `applicant_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicant_preferences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `prefer_location` varchar(100) NOT NULL,
  `notice_period` int unsigned NOT NULL,
  `expected_ctc` int unsigned NOT NULL,
  `current_ctc` int unsigned NOT NULL,
  `department` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_preferences_applicants` (`applicant_id`),
  CONSTRAINT `fk_preferences_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant_preferences`
--

LOCK TABLES `applicant_preferences` WRITE;
/*!40000 ALTER TABLE `applicant_preferences` DISABLE KEYS */;
INSERT INTO `applicant_preferences` VALUES (6,4,'remote,ahmedabad,bhavnagar',3,1600000,1300000,'Designer','2026-03-16 12:42:27','2026-03-17 09:22:14'),(8,6,'Bangalore',2,1500000,1200000,'Designer','2026-03-18 10:27:56','2026-03-18 10:27:56'),(9,7,'Bangalore',2,1500000,1200000,'Designer','2026-03-18 10:30:30','2026-03-18 10:30:30'),(10,8,'Bangalore',2,1500000,1200000,'Designer','2026-03-18 12:06:08','2026-03-18 12:06:08');
/*!40000 ALTER TABLE `applicant_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applicants_address`
--

DROP TABLE IF EXISTS `applicants_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicants_address` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `first_line` varchar(200) NOT NULL,
  `second_line` varchar(200) DEFAULT NULL,
  `applicant_city` varchar(50) NOT NULL,
  `applicant_state` varchar(50) NOT NULL,
  `applicant_pincode` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_address_applicants` (`applicant_id`),
  CONSTRAINT `fk_address_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicants_address`
--

LOCK TABLES `applicants_address` WRITE;
/*!40000 ALTER TABLE `applicants_address` DISABLE KEYS */;
INSERT INTO `applicants_address` VALUES (6,4,'123 Main St','Apt 4B','New York','Gujarat','10001','2026-03-16 12:42:06','2026-03-17 05:24:00'),(8,6,'123 Main St','Apt 4B','Bhavnagar','gujarat','10001','2026-03-18 10:25:11','2026-03-18 10:25:11'),(9,7,'123 Main St','Apt 4B','Bhavnagar','gujarat','10001','2026-03-18 10:30:11','2026-03-18 10:30:11'),(10,8,'123 Main St','Apt 4B','Bhavnagar','gujarat','10001','2026-03-18 12:03:28','2026-03-18 12:03:28'),(11,9,'123 Main St','Apt 4B','Bhavnagar','gujarat','10001','2026-03-18 12:08:33','2026-03-18 12:08:33');
/*!40000 ALTER TABLE `applicants_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education_details`
--

DROP TABLE IF EXISTS `education_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `course` varchar(100) NOT NULL,
  `passing_year` int NOT NULL,
  `university` varchar(500) NOT NULL,
  `result` decimal(5,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_educations_applicants` (`applicant_id`),
  CONSTRAINT `fk_educations_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education_details`
--

LOCK TABLES `education_details` WRITE;
/*!40000 ALTER TABLE `education_details` DISABLE KEYS */;
INSERT INTO `education_details` VALUES (10,4,'B.Tech',2020,'IIT Bombay',78.01,'2026-03-16 12:42:18','2026-03-18 10:00:49',1,'2026-03-18 10:00:50'),(11,4,'10th',2020,'Daxina',78.01,'2026-03-17 06:21:38','2026-03-18 10:00:49',1,'2026-03-18 10:00:50'),(12,4,'12th',2022,'Daxina',80.00,'2026-03-17 06:21:38','2026-03-18 10:00:49',1,'2026-03-18 10:00:50'),(14,4,'10th',2020,'Daxina',78.01,'2026-03-18 10:00:50','2026-03-18 10:00:50',0,NULL),(15,4,'12th',2022,'Daxina',80.00,'2026-03-18 10:00:50','2026-03-18 10:00:50',0,NULL),(16,6,'B.Tech',2020,'IIT Bombay',78.01,'2026-03-18 10:27:52','2026-03-18 10:27:52',0,NULL),(17,7,'B.Tech',2020,'IIT Bombay',78.01,'2026-03-18 10:30:19','2026-03-18 10:30:19',0,NULL),(18,8,'B.Tech',2020,'IIT Bombay',78.01,'2026-03-18 12:03:43','2026-03-18 12:03:43',0,NULL);
/*!40000 ALTER TABLE `education_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_applicants`
--

DROP TABLE IF EXISTS `job_applicants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applicants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email_address` varchar(200) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `applied_designation` varchar(100) NOT NULL,
  `relationship_status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_applicants_email` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applicants`
--

LOCK TABLES `job_applicants` WRITE;
/*!40000 ALTER TABLE `job_applicants` DISABLE KEYS */;
INSERT INTO `job_applicants` VALUES (4,'Sumit','Jadav','sumit.jadav@example.com','9876543210','male','1990-01-01','Software Engineer','single','2026-03-16 12:41:55','2026-03-17 06:27:24'),(6,'Shruti','Mishara','shruti.mishara@example.com','9876543210','female','1990-01-01','Software Engineer','single','2026-03-18 10:24:51','2026-03-18 10:26:12'),(7,'Mahesh','Sharma','mahesh.sharma@example.com','9876543210','male','1990-01-01','Software Engineer','single','2026-03-18 10:30:04','2026-03-18 10:30:04'),(8,'Uttam','Solanki','uttam.solanki@example.com','9876543210','male','1990-01-01','Software Engineer','single','2026-03-18 12:03:23','2026-03-18 12:03:23'),(9,'Darshit','Jadav','darshit.jadav@example.com','9876543210','male','1990-01-01','Software Engineer','single','2026-03-18 12:08:28','2026-03-18 12:08:28');
/*!40000 ALTER TABLE `job_applicants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_references`
--

DROP TABLE IF EXISTS `job_references`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_references` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `reference_name` varchar(100) NOT NULL,
  `reference_contact` varchar(20) NOT NULL,
  `relation` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_references_applicants` (`applicant_id`),
  CONSTRAINT `fk_references_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_references`
--

LOCK TABLES `job_references` WRITE;
/*!40000 ALTER TABLE `job_references` DISABLE KEYS */;
INSERT INTO `job_references` VALUES (8,4,'Masha','9876543210','Colleague','2026-03-17 10:12:51','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(9,4,'Masha','9876543210','Colleague','2026-03-17 10:14:43','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(10,4,'Zilong','7778884040','Senior','2026-03-17 10:14:43','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(11,4,'Masha','9876543210','Colleague','2026-03-17 10:16:57','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(12,4,'Masha','9876543210','Colleague','2026-03-17 10:19:04','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(13,4,'Zilong','7778884040','Senior','2026-03-17 10:19:04','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(14,4,'Masha','9876543210','Colleague','2026-03-17 10:23:41','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(15,4,'Zilong','7778884040','Senior','2026-03-17 10:23:41','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(16,4,'Selena','1234567890','Boss','2026-03-17 10:23:41','2026-03-17 10:24:29',1,'2026-03-17 10:24:30'),(17,4,'Masha','9876543210','Colleague','2026-03-17 10:24:29','2026-03-17 10:24:29',0,NULL),(18,4,'Zilong','7778884040','Senior','2026-03-17 10:24:29','2026-03-17 10:24:29',0,NULL),(19,4,'Selena','1234567890','Partner','2026-03-17 10:24:29','2026-03-17 10:24:29',0,NULL),(21,6,'Yu Zong','9876543210','Colleague','2026-03-18 10:27:57','2026-03-18 10:28:43',1,'2026-03-18 10:28:43'),(22,6,'Yu Zong','9876543210','Colleague','2026-03-18 10:28:43','2026-03-18 10:28:43',0,NULL),(23,6,'Miishara','4567891230','Senior','2026-03-18 10:28:43','2026-03-18 10:28:43',0,NULL),(24,7,'Yu Zong','9876543210','Colleague','2026-03-18 10:30:35','2026-03-18 10:30:35',0,NULL),(25,8,'Yu Zong','9876543210','Colleague','2026-03-18 12:06:12','2026-03-18 12:06:12',0,NULL);
/*!40000 ALTER TABLE `job_references` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_known`
--

DROP TABLE IF EXISTS `language_known`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language_known` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `language_name` varchar(100) NOT NULL,
  `can_speak` tinyint(1) NOT NULL DEFAULT '0',
  `can_write` tinyint(1) NOT NULL DEFAULT '0',
  `can_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_languages_applicants` (`applicant_id`),
  CONSTRAINT `fk_languages_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_known`
--

LOCK TABLES `language_known` WRITE;
/*!40000 ALTER TABLE `language_known` DISABLE KEYS */;
INSERT INTO `language_known` VALUES (29,4,'Hindi',0,1,0,'2026-03-18 09:30:53','2026-03-18 09:30:53',0,NULL),(30,4,'English',1,1,1,'2026-03-18 09:30:53','2026-03-18 09:30:53',0,NULL),(31,4,'Gujarati',0,1,0,'2026-03-18 09:30:53','2026-03-18 09:30:53',0,NULL),(32,6,'English',1,1,1,'2026-03-18 10:28:02','2026-03-18 10:28:02',0,NULL),(33,7,'English',1,1,1,'2026-03-18 10:30:40','2026-03-18 10:30:40',0,NULL),(34,8,'English',1,1,1,'2026-03-18 12:06:18','2026-03-18 12:06:18',0,NULL);
/*!40000 ALTER TABLE `language_known` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'Hindi'),(2,'English'),(3,'Gujarati');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'JAVA'),(2,'PYTHON'),(3,'PHP'),(4,'.NET');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technologies_known`
--

DROP TABLE IF EXISTS `technologies_known`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technologies_known` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `technology_name` varchar(100) NOT NULL,
  `is_beginner` tinyint(1) NOT NULL DEFAULT '0',
  `is_advance` tinyint(1) NOT NULL DEFAULT '0',
  `is_expert` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_technologies_applicants` (`applicant_id`),
  CONSTRAINT `fk_technologies_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies_known`
--

LOCK TABLES `technologies_known` WRITE;
/*!40000 ALTER TABLE `technologies_known` DISABLE KEYS */;
INSERT INTO `technologies_known` VALUES (55,4,'JAVA',0,0,1,'2026-03-18 07:47:54','2026-03-18 07:47:54'),(56,4,'PYTHON',0,1,0,'2026-03-18 07:47:54','2026-03-18 07:47:54'),(57,4,'PHP',0,0,1,'2026-03-18 07:47:54','2026-03-18 07:47:54'),(58,4,'.NET',0,1,0,'2026-03-18 07:47:54','2026-03-18 07:47:54'),(59,6,'PHP',1,0,0,'2026-03-18 10:28:04','2026-03-18 10:28:04'),(60,6,'.NET',0,0,1,'2026-03-18 10:28:04','2026-03-18 10:28:04'),(61,7,'PHP',1,0,0,'2026-03-18 10:30:51','2026-03-18 10:30:51'),(62,8,'PHP',1,0,0,'2026-03-18 12:06:23','2026-03-18 12:06:23');
/*!40000 ALTER TABLE `technologies_known` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experiences`
--

DROP TABLE IF EXISTS `work_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experiences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint unsigned NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date DEFAULT NULL,
  `annual_package` int unsigned NOT NULL,
  `reason_to_leave` text,
  `ref_contact_name` varchar(100) DEFAULT NULL,
  `ref_contact_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_experiences_applicants` (`applicant_id`),
  CONSTRAINT `fk_experiences_applicants` FOREIGN KEY (`applicant_id`) REFERENCES `job_applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experiences`
--

LOCK TABLES `work_experiences` WRITE;
/*!40000 ALTER TABLE `work_experiences` DISABLE KEYS */;
INSERT INTO `work_experiences` VALUES (1,4,'Google','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-16 12:43:02','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(2,4,'Google','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-17 08:15:32','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(3,4,'Facebook','Developer','2024-01-01','2026-01-01',1600000,'Career Growth','Masha ','7778884040','2026-03-17 08:15:32','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(4,4,'Google','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-17 10:20:28','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(5,4,'Facebook','Developer','2024-01-01','2026-01-01',1600000,'Career','Masha ','7778884040','2026-03-17 10:20:28','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(6,4,'Google','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-17 10:27:40','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(7,4,'Facebook','Developer','2024-01-01','2026-01-01',1600000,'Career Growth','Masha ','7778884040','2026-03-17 10:27:40','2026-03-17 10:28:12',1,'2026-03-17 10:28:13'),(8,4,'Google','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-17 10:28:12','2026-03-17 10:28:12',0,NULL),(9,4,'Facebook','Developer','2024-01-01','2026-01-01',1600000,'Career ','Masha ','7778884040','2026-03-17 10:28:12','2026-03-17 10:28:12',0,NULL),(11,6,'Foogle','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-18 10:27:55','2026-03-18 10:27:55',0,NULL),(12,7,'Foogle','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-18 10:30:24','2026-03-18 10:30:24',0,NULL),(13,8,'Foogle','Software Engineer','2020-08-01','2023-05-31',1200000,'Career Growth','John Doe','9876543210','2026-03-18 12:06:01','2026-03-18 12:06:01',0,NULL);
/*!40000 ALTER TABLE `work_experiences` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-18 18:31:09
