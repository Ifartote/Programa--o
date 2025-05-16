CREATE DATABASE engenhariapoc;
USE engenhariapoc;
CREATE TABLE bodycam (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100),
    numeroSerie VARCHAR(100) UNIQUE,
    estado VARCHAR(50),
    chip VARCHAR(50),
    vendedor VARCHAR(100),
    revenda VARCHAR(100),
    saida DATE
);