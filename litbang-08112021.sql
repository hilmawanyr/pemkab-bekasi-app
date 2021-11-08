-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: litbang
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `issue_attachment`
--

DROP TABLE IF EXISTS `issue_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issue_attachment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `issue_id` int NOT NULL,
  `type` int NOT NULL,
  `original_source` text NOT NULL,
  `thumb_source` text,
  `created_by` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_by` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_attachment`
--

LOCK TABLES `issue_attachment` WRITE;
/*!40000 ALTER TABLE `issue_attachment` DISABLE KEYS */;
INSERT INTO `issue_attachment` VALUES (1,1,1,'/original/981851.png','/thumbnail/thumb-981851.png',2,'2021-09-15 22:58:15',NULL,NULL);
/*!40000 ALTER TABLE `issue_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_by` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `issues___fk__pj` (`project_id`),
  CONSTRAINT `issues___fk__pj` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
INSERT INTO `issues` VALUES (1,1,'Lubang depan kantor desa','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','-6.230820585020689','107.06368941119374',NULL,2,'2021-09-15 16:38:46',2,'2021-09-15 16:38:46',NULL,NULL),(2,1,'Lubang jalan aspal','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','-6.230820585020689','107.06368941119374',NULL,1,'2021-09-15 16:57:39',2,'2021-09-15 16:57:39',NULL,NULL);
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_recovery`
--

DROP TABLE IF EXISTS `password_recovery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_recovery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `key_string` varchar(20) NOT NULL,
  `is_used` tinyint DEFAULT NULL COMMENT '1=has used, null=not used',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_recovery`
--

LOCK TABLES `password_recovery` WRITE;
/*!40000 ALTER TABLE `password_recovery` DISABLE KEYS */;
INSERT INTO `password_recovery` VALUES (1,'hilmawanyr@gmail.com','HFLNKOPOQOKHPRJKEOGP',NULL,'2021-09-25 07:53:34'),(2,'hilmawanyr@gmail.com','GAGSSFOPTBTAANTFDRQQ',NULL,'2021-09-25 07:54:29'),(3,'hilmawanyr@gmail.com','EGAPFNPLQDTERPGEMFIG',NULL,'2021-09-25 07:54:57'),(4,'hilmawanyr@gmail.com','FNCEEDALMDKRBQIRRDLJ',NULL,'2021-09-25 07:55:10'),(5,'hilmawanyr@gmail.com','ICKGRTAQBIPHAOADAENS',NULL,'2021-09-25 08:43:08'),(6,'hilmawanyr@gmail.com','QbX9otYk0X3b8xe6ZAXr',1,'2021-09-25 08:52:37'),(7,'hilmawanyr@gmail.com','TR5WWf6sBpO73sWMqair',NULL,'2021-09-25 12:15:00'),(8,'hilmawanyr@gmail.com','jzndatgY3Am9fNNlrDaG',NULL,'2021-09-25 12:26:28'),(9,'hilmawanyr@gmail.com','w1zpEpR7uLWQe3kvEDVw',NULL,'2021-09-25 12:40:27'),(10,'hilmawanyr@gmail.com','QCqQzQROmDS9bMtR66gM',NULL,'2021-09-25 12:43:01'),(11,'hilmawanyr@gmail.com','p4xXoge95tdI9VvwT0kQ',NULL,'2021-09-25 12:43:21'),(12,'hilmawanyr@gmail.com','eJcc0BfPKvnP0u1maCfy',NULL,'2021-09-25 12:43:32'),(13,'hilmawanyr@gmail.com','HQGRQ3GXEGXjOnveivhL',NULL,'2021-09-25 12:47:08'),(14,'hilmawanyr@gmail.com','prm5Rpv5Q71nVjF4VIaG',NULL,'2021-09-25 12:48:09'),(15,'hilmawanyr@gmail.com','zpiUpEe7xOlt2s7NAono',NULL,'2021-09-25 12:49:56'),(16,'hilmawanyr@gmail.com','lmIt7tgqgJneO9TismFd',NULL,'2021-09-25 12:52:42'),(17,'hilmawanyr@gmail.com','YQe6RENscN5N4Uwsnj3F',1,'2021-09-25 12:54:55');
/*!40000 ALTER TABLE `password_recovery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `description` text NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_by` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `code_2` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Jalan Berlubang','0b6qokSiMObrDIAoDbz9','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',0,'2021-09-05 18:22:06',2,'2021-09-25 15:30:48',NULL,NULL),(7,'Pohon tumbang','SSEKF8ubKqJDU5knvH52','Pohon tumbang terjadi di daerah pekayon setelah terjadi hujan disertai angin kencang pada dini hari tadi',2,'2021-09-25 15:24:44',NULL,'2021-09-25 15:25:33',2,'2021-09-25 03:25:33'),(8,'Banjir 1','kuPiJ5S0JnQI8PahyXjM','Lorem ipsum dolor sit amet 2',2,'2021-09-26 14:56:08',2,'2021-09-26 14:57:30',NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_token` (
  `user_id` int NOT NULL,
  `token` text NOT NULL,
  `token_refresh` text NOT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expired_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token`
--

LOCK TABLES `user_token` WRITE;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('ADMINISTRATOR','RESEARCHER','DATA_COLLECTOR') NOT NULL,
  `user_project` text,
  `is_ban` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(60) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(60) DEFAULT NULL,
  `deleted_by` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `users_email_uindex` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nurfan','nurfan@web.id','8172ab7fb4d7dbff5fcecefab41b01215d713e712da10a4a3cc1902fcb2f8ba3\n','DATA_COLLECTOR','2,3,1,8,',0,'2021-09-05 18:08:11','0','2021-09-26 14:58:07','2',NULL,NULL),(2,'admin','hilmawanyr@gmail.com','$2a$10$nw0/EIcxOEplXVvAOrPrJee0hewVfOmWKpho03glUX2bGj3Bn7DI.','ADMINISTRATOR','1,7,8,',0,'2021-09-06 15:40:38','0','2021-09-26 14:58:07',NULL,NULL,NULL),(7,'hilman','hilman@hilman.id','$2a$10$GHbfAi6J7c0CEzxCgD1XsOQUPTr58.W6ICFWI8XPGjaMOElzv6GmK','RESEARCHER','1,7,',0,'2021-09-07 01:34:37','admin','2021-09-26 09:58:11','2',NULL,NULL),(9,'user','user@mail.com','$2a$10$DPLbaBh6.1QnMZ8P3s1xEesHg5RPWTEEkKiOqDufMtOMNJE.h9uc2','DATA_COLLECTOR',',',0,'2021-09-09 21:17:04','admin','2021-09-25 10:20:48','2',NULL,NULL),(10,'staff','staff@mail.id','$2a$10$ilhbQniFqz4qeTT6SHlPOODkKsKlCsu1VpJ5HXh4EhvLmtp2ET8yS','RESEARCHER',NULL,0,'2021-09-10 10:49:56','admin','2021-09-10 10:50:23',NULL,'admin','2021-09-10 10:50:23'),(11,'staff1','staff1@mail.id','$2a$10$szKeW0PYihpUoQhdv3FMs.egGFumUDRw4qLhgYkuDar.kBzzqrkcS','RESEARCHER',',',1,'2021-09-16 12:12:11','admin','2021-09-25 10:22:50','2',NULL,NULL),(12,'staff2','staff2@mail.id','$2a$10$B2lZQJSykQ8UEgEqUuQ8qOFiSn25q/vyvaSigXHh.2UUPutABVivG','DATA_COLLECTOR',',',1,'2021-09-22 17:33:59','admin','2021-09-25 10:22:55','2',NULL,NULL),(13,'staff3','staff3@mail.id','$2a$10$jlaW1FM65E8qPUBPfLxQRehPZ.KPvJTlLQ5ViIUh67GXBg1rmtp/G','DATA_COLLECTOR',',',0,'2021-09-22 17:34:24','admin','2021-09-25 10:23:01','2',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-08 11:26:10
