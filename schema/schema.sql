CREATE DATABASE todoApp;
USE todoApp;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";

CREATE TABLE todos (
    todo_id varchar(40) NOT NULL,
    task text NOT NULL,
    completed boolean NOT NULL,
    PRIMARY KEY (todo_id)
);

INSERT INTO todos(todo_id, task, completed) VALUES ("1", "item 1", false);
INSERT INTO todos(todo_id, task, completed) VALUES ("2", "item 2", false);
INSERT INTO todos(todo_id, task, completed) VALUES ("3", "item 3", false);
INSERT INTO todos(todo_id, task, completed) VALUES ("4", "item 4", false);
INSERT INTO todos(todo_id, task, completed) VALUES ("5", "item 5", false);
