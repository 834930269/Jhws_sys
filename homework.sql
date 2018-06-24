/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : homework

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-06-24 18:49:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `studentID` int(11) NOT NULL,
  `topicID` int(11) NOT NULL,
  `status` bit(1) NOT NULL COMMENT '题目状态',
  `TimeStamp` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `studentID` (`studentID`),
  KEY `topicID` (`topicID`),
  CONSTRAINT `record_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `user` (`ID`),
  CONSTRAINT `record_ibfk_2` FOREIGN KEY (`topicID`) REFERENCES `topic` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('7', '8', '25', '', '2018-06-24 18:14:22');
INSERT INTO `record` VALUES ('8', '8', '35', '', '2018-06-24 18:14:30');
INSERT INTO `record` VALUES ('9', '8', '33', '\0', '2018-06-24 18:14:36');
INSERT INTO `record` VALUES ('10', '8', '30', '', '2018-06-24 18:15:18');
INSERT INTO `record` VALUES ('11', '8', '29', '\0', '2018-06-24 18:15:22');
INSERT INTO `record` VALUES ('12', '8', '38', '', '2018-06-24 18:24:13');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `exprience` text COMMENT '资历',
  `UserID` int(11) NOT NULL,
  `adapt` text COMMENT '擅长',
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', null, '1', null);
INSERT INTO `teacher` VALUES ('2', null, '2', null);
INSERT INTO `teacher` VALUES ('3', null, '3', null);
INSERT INTO `teacher` VALUES ('4', null, '5', null);
INSERT INTO `teacher` VALUES ('5', null, '6', null);
INSERT INTO `teacher` VALUES ('6', null, '7', null);
INSERT INTO `teacher` VALUES ('7', null, '8', null);
INSERT INTO `teacher` VALUES ('8', null, '9', null);
INSERT INTO `teacher` VALUES ('9', null, '11', null);

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `teacherID` int(11) NOT NULL,
  `content` text NOT NULL COMMENT '题干',
  `Grade` int(11) NOT NULL COMMENT '题目所属年级',
  `answer` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `analysis` text NOT NULL COMMENT '解析',
  `score` int(11) NOT NULL,
  `choices` varchar(500) NOT NULL,
  `TimeStamp` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `teacherID` (`teacherID`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO `topic` VALUES ('3', '7', '你好的英文', '1', '1', '2', 'Aloha是夏威夷你好', '32', 'Hello,Aloha,Holy,Hallo', '2018-06-23 16:54:59');
INSERT INTO `topic` VALUES ('4', '7', '骆驼祥子是谁写的', '4', '1', '3', '青岛青岛,老舍旧居.', '16', '老舍,鲁迅,朱自清,三毛', '2018-06-23 16:56:48');
INSERT INTO `topic` VALUES ('25', '7', '至少有几个小正方形才能拼成一个大正方形?', '1', '2', '1', '四个正方形', '30', '2,4,6,7', '2018-06-24 17:52:09');
INSERT INTO `topic` VALUES ('26', '7', '要拼成两个三角形至少需要几根小棒?', '1', '3', '1', '有一条边重叠', '20', '4,3,5,2', '2018-06-24 17:53:37');
INSERT INTO `topic` VALUES ('27', '7', '比52多一些的数是?', '1', '4', '1', '多一点嘛,59啦', '20', '60,68,50,59', '2018-06-24 17:54:36');
INSERT INTO `topic` VALUES ('28', '7', '\"椅子\"用英语怎么说?', '1', '3', '2', 'desk是桌子', '30', 'dest,desk,chair,yizi', '2018-06-24 17:56:54');
INSERT INTO `topic` VALUES ('29', '7', '\"How are you?\" 什么意思?', '1', '1', '2', '答案是你好', '30', '你好,我也好,你好不好,你很好', '2018-06-24 17:58:54');
INSERT INTO `topic` VALUES ('30', '7', '同学们的活动时间是?', '1', '2', '3', '当然是下课啦', '10', '上课,下课,午睡,吃饭', '2018-06-24 18:02:20');
INSERT INTO `topic` VALUES ('32', '7', '我们在哪个国家', '1', '1', '4', '当然在中国啦', '100', '中国,美国,外国,宇宙国(韩国)', '2018-06-24 18:05:45');
INSERT INTO `topic` VALUES ('33', '7', '你几年级啊?', '1', '1', '3', '= =', '1', '一年级,十一年级,一千零一年级,二年级', '2018-06-24 18:07:17');
INSERT INTO `topic` VALUES ('34', '7', '我们生活在农村,所以我们可以乱丢垃圾.', '1', '2', '4', '人人都应讲道德!', '11', '能,不能,或许能,或许不能', '2018-06-24 18:09:53');
INSERT INTO `topic` VALUES ('35', '7', '若你被牢牢的保护起来,将来,你还会有你现在的斗志么.', '1', '4', '4', '树叶紧抓着大树直到枯黄,蒲公英竭尽全力向着远方飞去.', '100', '我喜欢被人照顾,我想永远在家里,没有,有', '2018-06-24 18:13:54');
INSERT INTO `topic` VALUES ('36', '7', '分母一定,分子和分数值( )', '6', '1', '1', '根据  分子/分母 =分数值可知，\n分母×分数值=分子（一定），是乘积一定，\n所以分母和分数值成反比例；\n\n分子÷分数值=分母（一定），是比值一定，\n所以分子和分数值成正比例．\n故答案为：反，正．', '100', '成正比例,成反比例,不成比例,以上都不对', '2018-06-24 18:18:44');
INSERT INTO `topic` VALUES ('38', '7', '已知a、b、c都是质数，且a+b=c，那么a b c的最小值是_____．', '6', '4', '1', '由偶数加奇数为奇数知,a和b中一定有一个是2,设a是2,则a+3=5\n故b=3,c=5', '100', '2 3 3,2 5 7,2 2 4,2 3 5', '2018-06-24 18:23:58');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `Grade` int(11) NOT NULL COMMENT '年级',
  `Gravater` varchar(255) NOT NULL COMMENT '头像路径',
  `Identified` int(11) NOT NULL,
  `UserName` varchar(60) NOT NULL COMMENT '账号',
  `Password` varchar(60) NOT NULL COMMENT '密码',
  `TimeStamp` datetime NOT NULL,
  `token` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '王俊凡', '3', '../images/Gravater/default.jpg', '15', 'cleverboy@qq.com', 'cleverboy', '2018-05-17 09:44:03', '123');
INSERT INTO `user` VALUES ('2', '马云龙', '3', '../images/Gravater/default.jpg', '15', 'coolboy@qq.com', 'coolboy', '2018-05-17 09:46:20', '123');
INSERT INTO `user` VALUES ('3', '张文涛', '1', '../images/Gravater/default.jpg', '15', '834930269', '13569859563', '2018-05-27 21:40:02', '790643f83f258ea22bef97b1245758695ced36ad');
INSERT INTO `user` VALUES ('4', '管理员', '6', '../images/Gravater/admin.jpg', '255', 'admin', 'admin', '2018-05-27 21:48:26', 'ee982c37763d91663bf032bea968cfbbe5e8e9bc');
INSERT INTO `user` VALUES ('5', 'Aaron', '1', '../images/Gravater/default.jpg', '15', 'Aaron', 'admin', '2018-05-28 13:55:26', 'd3761d43cc0d020d1472a6957aeb474a11f49bb6');
INSERT INTO `user` VALUES ('6', 'casa', '1', '../images/Gravater/default.jpg', '15', 'casa', 'admin', '2018-05-28 13:57:46', '');
INSERT INTO `user` VALUES ('7', '刑天', '2', '../images/Gravater/default.jpg', '15', 'apache', 'apache', '2018-05-28 13:59:05', '');
INSERT INTO `user` VALUES ('8', 'Asriel', '1', '../images/Gravater/Asriel.jpg?rdm=47', '15', 'Asriel', 'Asriel', '2018-05-28 20:05:38', 'a7dda19be030d6c39d4a932a19e4d893b84b1a3d');
INSERT INTO `user` VALUES ('9', '王者', '1', '../images/Gravater/default.jpg', '15', 'Nuo', 'admin', '2018-05-29 14:15:27', '');
INSERT INTO `user` VALUES ('10', 'Asriel', '3', '../images/Gravater/default.jpg', '2', '12356', '123456', '2018-06-12 14:12:09', null);
INSERT INTO `user` VALUES ('11', 'test', '2', '../images/Gravater/default.jpg', '15', 'test', 'test', '2018-06-12 14:12:50', '');
INSERT INTO `user` VALUES ('12', 'sa', '3', '../images/Gravater/default.jpg', '2', 'sa', 'sa', '2018-06-12 14:12:56', null);
INSERT INTO `user` VALUES ('13', 'saa', '1', '../images/Gravater/default.jpg', '2', 'saa', 'saa', '2018-06-12 14:13:05', null);

-- ----------------------------
-- Procedure structure for add_user
-- ----------------------------
DROP PROCEDURE IF EXISTS `add_user`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(IN name_ varchar(20),IN grade_ int,IN username_ varchar(60),
IN password_ varchar(60),OUT status INT)
BEGIN
		DECLARE st INT;
		DECLARE Gt varchar(255) DEFAULT './Image/Gravater/default.jpg';
		DECLARE iden INT DEFAULT 0x02;
		SET st=0;
		SELECT COUNT(*) INTO st FROM user where user.UserName=username_;
		SET status=st;
		IF st=0 then

			INSERT INTO user (Name,Grade,Gravater,Identified,UserName,Password,TimeStamp) VALUES 
			(name_,grade_,Gt,iden,username_,password_,now());
		END IF;
	END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for check_user
-- ----------------------------
DROP PROCEDURE IF EXISTS `check_user`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_user`(IN username_ varchar(60),IN password_ varchar(60),OUT status INT)
BEGIN
		DECLARE st INT;
		DECLARE OK INT DEFAULT 1;
		DECLARE FAIL INT DEFAULT 0;
		DECLARE NOTEXSIST INT DEFAULT -1;
		DECLARE pwd varchar(60);
		SET st=0;
		SET status=FAIL;
		SELECT COUNT(*),Password INTO st,pwd FROM user where `user`.UserName = username_;
		
		IF st=1 THEN
			IF password_=pwd THEN
				SET status=OK;
			END IF;
		ELSE
			SET status=NOTEXSIST;
		END IF;
	END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for simpleproc
-- ----------------------------
DROP PROCEDURE IF EXISTS `simpleproc`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `simpleproc`(OUT param1 INT)
BEGIN
		SELECT COUNT(*) INTO param1 FROM record;
	END
;;
DELIMITER ;
