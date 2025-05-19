CREATE DATABASE programa_o;
USE programa_o;
CREATE TABLE integracao (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 idade INT,
 altura DECIMAL(5,2),
 status VARCHAR(50)
 );