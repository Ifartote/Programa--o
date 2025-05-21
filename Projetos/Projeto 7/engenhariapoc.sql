CREATE DATABASE programa_o;
USE programa_o;
CREATE TABLE inv_bodycam(
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100),
    numeroSerie VARCHAR(100),
    estado VARCHAR(50),
    chip VARCHAR(50),
    vendedor VARCHAR(100),
    revenda VARCHAR(100),
    saida DATE
);
