-- add tasks
Use `tasks_user`; 

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(1000) NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `is_infinite` INT(1) NULL,
  `is_active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`task_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`));
