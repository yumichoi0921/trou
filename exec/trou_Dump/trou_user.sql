-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: j6b203.p.ssafy.io    Database: trou
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a.com','123',NULL,'김중재'),(6,'string','string',NULL,'캉테'),(9,'string2','string2',NULL,NULL),(10,'string3','string3',NULL,NULL),(13,'1111','$2a$10$DBWHhg5HwMD3llv6yoKzhu1cx8R.ll3VTjw1Rf69fZOBUI9YcZ6XG',NULL,NULL),(14,'2222','$2a$10$Ilei03W9zobew8DNO493ouRcQTe3jxp2AjEfIj9WuaTojzM5TyYUC',NULL,'2222'),(15,'3333','$2a$10$ATBJuZdvMuwI8CGKB18Zn.A7QxYrqkKBMFRisL/m.UKUM1xVYhtxe','USER','3333'),(16,'strddding','$2a$10$gQ1Kk2/Zxu8yiXDAJcyZ..iA2y5DlgfjRrUqk2eXVrsQh3LixTfl2','USER','stridddng'),(17,'dwedada@naver.com','$2a$10$6.skmWhdBXp39c6IwdrA0eVrEeFcXLcrypJsJm0G/iN7BVcV.5mFW','USER','fsdfsdf'),(18,'bbbbb@naver.com','$2a$10$0WlQdnge0aw8/oJTEB/smekHzF50O01oRsCBR20XIVXwoUSWoTIzC','USER','bbbbbb'),(19,'bbbbb@naver.com','$2a$10$hhicziSlN57iqnG1dbNqFOGdO4DFcH/5dyjWpHcQHkXoS1xGcPc1e','USER','bbbbbb'),(20,'ffffff@naver.com','$2a$10$4GAwxvhWJdJTN3VIaQ0gpuuRPyrF4sKofdpO8dPridmVnkiu0r6dC','USER','fffff'),(21,'ffffff@naver.com','$2a$10$ETUREEHumiRZ5DKFcm6AF.1yxLVhpffdNwtjmK6lP3v0sKWFaO9tO','USER','fffff'),(22,'ccccc@naver.com','$2a$10$FOd0.y1hoyvN1rMxOZ2YMu15YZnl0YtsXhhKnFhV9t1S.xX5kE2Q6','USER','cccccc'),(23,'gggggg@naver.com','$2a$10$B7mCN4omCbgkRb8n0uKRu.UPWPj4nH20pXirQmItuIuU8BVj9ShNy','USER','gggggg'),(24,'cathy192@naver.com','$2a$10$NpMnPDUTdFj5.PqWKv1NDuy4l79ktcO1CNVs5m10ABUkdV81Oya8S','USER','예나'),(25,'cathy193@naver.com','$2a$10$lem3CV9vzre.6VTFtBj7rOKaUCPgok.dTnkzLhKdyMEBTmfQfWRB6','USER','예나ㅏ'),(26,'cathy194@naver.com','$2a$10$Ocz/Cj/yn1pZ/vi39TB2k.z4Fz3uqcFWHvw50k9OEaqua4eW8BgOq','USER','ddddd'),(27,'cathy196@naver.com','$2a$10$vh4C2CQGPEio27AvmDCHx.IloKBgP71j2kei82oZy.BNslAb2H1Zu','USER','ddd'),(28,'ssafy@ssafy.com','$2a$10$Tk4hmZ7fX8kDFNX.j9o/xOUiw5co85ireCrQpLOGxJIrS3o9k73UC','USER','김싸피'),(29,'luky0628@naver.com','$2a$10$LtdNMuP4RHDx8d.EvkU4QORkDXRcx.zmjnviYb5YiGDqSzLlaEJAO','USER','김지수'),(30,'rlawndwo1305@naver.com','$2a$10$p69JWTkEfOnCmWInssDrXubkPO4G5zNkbdKG0ohQjFDBrzlBzDDaK','USER','김중재'),(31,'an9292@naver.com','$2a$10$dpXkNeFgGf1jOs7hFtFfj.6o1do.8yVG37jS9mNP9MxCzlffoCa6K','USER','안예지'),(33,'yumichoi0921@gmail.com@gmail.com','$2a$10$adwyAnsSvmsDMDmXCbYHue2Pssk7tdCs9BgzvLh.eGJmAOjovI/kO','USER','최유미'),(34,'123@gmail.com','$2a$10$uEwMMimLeWRt/Y.m/mnMvOMAXm7eebM6YToDrCw0A4Be4x7E18bgm','USER','123'),(35,'12@gmail.com','$2a$10$jbETzidV/JLWkkKJW7fls.sfkRcWE0nB5wEgRVzB8H46H0lufpufi','USER','12'),(36,'111@gmail.com','$2a$10$YlKuXb19uWC.FJkdTIR2MewVs1u/EtXMKw9.x2pYRkEMZ9iul7Pzi','USER','111'),(37,'yumichoi0921@gmail.com','$2a$10$ExOriUZaOzkOZwmPBnG/qu7KciplHHN9DigehHwO6jvia3OAdhWIe','USER','최유미'),(38,'kdkm2002@naver.com','$2a$10$4n0t57M78WjZ.94IQ1MnFOsI5Li.ZOH2atgikqEI9iokvxo3kbCbG','USER','경규동'),(39,'test@gmail.com','$2a$10$4zTEjaOvLxPmHdGklcIFLux/B3vQcG.JPydULuq.2V0oms2IViY/u','USER','test'),(40,'kkdkkd@naver.com','$2a$10$CCVxSt.tR4f9BTdBHEa.rusGnsIYqdj2jkXsa0rvCZpMn5fb9y606','USER','경규동'),(41,'test1@gmail.com','$2a$10$4XIn6jaFWrSj/wrrzHSygOIUnGUfli1uiNoqHsWMoJ.YZ9hjmXR9S','USER','test1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:42:22
