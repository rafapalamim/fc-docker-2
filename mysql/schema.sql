CREATE DATABASE IF NOT EXISTS fc;
USE fc;

CREATE TABLE IF NOT EXISTS person (
    id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name varchar(255)
)