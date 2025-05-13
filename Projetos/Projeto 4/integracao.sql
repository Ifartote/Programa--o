create DATABASE teste;
USE teste;
CREATE TABLE integracao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    altura DECIMAL(5,2) NOT NULL,
    status VARCHAR(50) NOT NULL
);