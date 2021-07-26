-- add user
Use `tasks_user`; 
INSERT INTO `users`
(`username`,
`password`,
`name`,
`role`)
VALUES
('admin',
'senha12345',
'Ivan Ferrer',
'admin');

-- add example tesk 
INSERT INTO `tasks`
(
`user_id`,    
`name`,
`description`,
`start_date`,
`end_date`,
`is_infinite`,
`is_active`)
VALUES
('1','Registrar cardápio', 
'Deve ser registrado cada um dos items do cadápio.', 
now(), 
ADDDATE(now(), INTERVAL 10 DAY), 
'0',
'1');
-- add service
INSERT INTO  `services`
(`name`,
`task_id`,
`is_active`)
VALUES
('Tarefa',
'1',
'1');
