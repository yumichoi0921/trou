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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `score` int NOT NULL,
  `place_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKn429agmmvh298piqrnnd4gbfg` (`place_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKn429agmmvh298piqrnnd4gbfg` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2022-03-29','2022-04-07','너무 멋져요',7,126438,1),(2,'2022-04-04','2022-04-04','굳',4,126434,1),(3,'2022-04-04','2022-04-04','최고',8,126435,1),(4,'2022-04-04','2022-04-04','별루입니다',2,126436,1),(6,'2022-04-04','2022-04-04','좋아요',8,126438,6),(7,'2022-04-04','2022-04-04','별로입니다',3,126436,6),(8,'2022-04-04','2022-04-04','최고입니다',9,126436,9),(9,'2022-04-04','2022-04-04','좋습니다',7,126435,9),(10,'2022-04-04','2022-04-04','너무 좋아여',9,126437,9),(12,'2022-04-06','2022-04-06','좋아요',5,129145,1),(27,'2022-04-06','2022-04-06','짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱짱',9,129145,1),(30,'2022-04-07','2022-04-07','굿굿',5,128345,1),(32,'2022-04-07','2022-04-07','토함산',3,128345,1),(38,'2022-04-07','2022-04-07','최고',8,2781700,6),(39,'2022-04-07','2022-04-07','즐거운 시간ㅎㅎ',9,2781700,6),(40,'2022-04-07','2022-04-07','그냥 그래요',6,2781700,9),(41,'2022-04-07','2022-04-07','나쁘지 않아요',7,125657,9),(42,'2022-04-07','2022-04-07','즐거운 시간 보냈ㅅ어요',8,125657,6),(43,'2022-04-07','2022-04-07','최고입니ㅏㄷ.',9,125657,9),(44,'2022-04-07','2022-04-07','좋아요',10,125806,9),(46,NULL,NULL,'너무 좋아요',8,129145,1),(47,NULL,NULL,'I love Jeju!',8,129145,6),(49,NULL,NULL,'별로에여',2,129145,28),(50,NULL,NULL,'다시 와야지',6,129145,6),(51,NULL,NULL,'대만족입니다',10,129145,6),(56,'2022-04-07','2022-04-07','작은해변.\r\n조용한 곳\r\n그러나 갖출것은 다있어요\r\n가시려면 좀 일찍 가셔야 됩니다\r\n아이들 놀기 딱좋습니다\r\n어른 시아에 다들어와요',5,636393,24),(57,'2022-04-07','2022-04-07','금능이나 협재가 근처 숙소라면 숙소가는 길에 잠시 들를만 합니다. 규모가 큰거는 아니여서 한시간 정도 산책한다 생각하시면 됩니다. 바다 옆에 나있는 데크를 따라 산책하시면 되고 조밀조밀 펴있는 선인장들이 정말 신기합니다. 마을에도 여기저기 선인장이 있구요 벽화도 그려져있어 둘러보며 사진 찍기 좋아요. 강식당 촬영했던 식당도 있고 마을건너편에 백년초로 만드는 햄버거집도 있습니다~',4,636393,30),(58,'2022-04-07','2022-04-07','근처를 지나가게되면 한 번 들러볼만 하다. 선인장 군락은 자연 그대로의 느낌이고, 산책로 데크가 잘 조성되어 있다. 시원한 바다바람 맞으며 풍경을 즐길 수 있는 곳',4,636393,6),(60,NULL,NULL,'너무 좋아요',8,129145,1),(61,NULL,NULL,'I love Jeju!',8,129145,6),(63,NULL,NULL,'별로에여',2,129145,28),(64,NULL,NULL,'다시 와야지',6,129145,6),(65,NULL,NULL,'대만족입니다',10,129145,6),(66,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125266,37),(67,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125405,37),(68,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125406,37),(69,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125407,37),(70,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125408,37),(71,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125409,37),(72,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125410,37),(73,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125411,37),(74,'2022-04-07','2022-04-07','여기 너무 좋았어요. 추억쌓기에 최고입니다. 추천합니다!',4,125412,37);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:42:20
