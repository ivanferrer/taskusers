-- add user
Use `tasks_user`; 

CREATE TABLE  `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `task_id` INT(11) NOT NULL,
  `is_active` INT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_services` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`));