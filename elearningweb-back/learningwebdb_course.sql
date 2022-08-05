-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: learningwebdb
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `teacher_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `content` text NOT NULL,
  `price` decimal(4,1) NOT NULL,
  `level` tinyint DEFAULT '0',
  `date_created` date NOT NULL,
  `date_updated` date DEFAULT NULL,
  `discount` tinyint NOT NULL,
  `discount_end` date DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `is_bestseller` tinyint DEFAULT '0',
  `enrolled_number` int DEFAULT '0',
  `comment_number` int DEFAULT '0',
  `teacher_name` varchar(255) NOT NULL,
  `avg_rating` decimal(2,1) DEFAULT NULL,
  `preview_video_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'Java','Learn deeper about the java spring framework and gain real project experience','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',500.0,0,'2020-05-06',NULL,0,'2021-12-28','/images/course1.jpg',1,15000,8700,'Jose Portalin',4.0,'/videos/video1.mp4'),(2,1,'Python for Data Science and Machine Learning Bootcamp','Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',300.0,1,'2020-07-09',NULL,0,'2021-12-28','/images/course2.jpg',1,5000,2300,'Quan',3.0,'/videos/video2.mp4'),(3,1,'Learn Python Programming Masterclass','This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',399.0,2,'2020-07-14',NULL,0,NULL,'/images/course3.jpg',0,0,0,'Quan',5.0,'/videos/video3.mp4'),(4,1,'Ultimate AWS Certified Solutions Architect Associate 2021','Pass the AWS Certified Solutions Architect Associate Certification SAA-C02. Complete Amazon Web Services Cloud training!','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',155.0,2,'2020-07-14',NULL,0,'2021-12-28','/images/course4.jpg',1,0,0,'Quan',3.0,'/videos/video4.mp4'),(5,1,'The Complete Cyber Security Course : Hackers Exposed!','Volume 1 : Become a Cyber Security Specialist, Learn How to Stop Hackers, Prevent Hacking,','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',200.0,1,'2020-07-16',NULL,0,NULL,'/images/course5.jpg',1,0,0,'Quan',4.0,'/videos/video5.mp4'),(6,1,'Learn Linux in 5 Days and Level Up Your Career','Course 1: Everything you need to pass the A+ Certification Core 1 (220-1001) Exam, from Mike Meyers and Total Seminars.','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',200.0,0,'2020-07-16',NULL,0,'2021-12-28','/images/course6.jpg',1,0,0,'Quan',5.0,'/videos/video6.mp4'),(7,2,'Python for Data Science and Machine Learning Bootcamp','Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',200.0,0,'2020-07-16',NULL,1,NULL,'/images/course7.jpg',0,1000,600,'Nathan House',5.0,'/videos/video7.mp4'),(8,2,'Python for Data Science and Machine Learning Bootcamp','Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',200.0,0,'2020-07-16',NULL,1,'2021-12-28','/images/course8.jpg',0,1000,600,'Nathan House',4.0,'/videos/video8.mp4'),(9,2,'Python for Data Science and Machine Learning Bootcamp','Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',200.0,0,'2020-07-16',NULL,1,NULL,'/images/course9.jpg',0,1000,600,'Nathan House',4.0,'/videos/video9.mp4'),(10,2,'Python for Data Science and Machine Learning Bootcamp','Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.','Welcome to Part 1 - Data Preprocessing, Data Preprocessing in Python, Data Preprocessing in R, Regression, Simple Linear Regression, Multiple Linear Regression, Polynomial Regression, Support Vector Regression (SVR), Decision Tree Regression ',200.0,0,'2020-07-16',NULL,1,'2021-12-28','/images/course10.jpg',0,1000,600,'Nathan House',4.5,'/videos/video10.mp4');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-24  2:24:41
