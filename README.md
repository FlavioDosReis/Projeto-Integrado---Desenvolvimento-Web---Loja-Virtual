# Projeto-Integrado---Desenvolvimento-Web---Loja-Virtual

sql

CREATE DATABASE IF NOT EXISTS realizart;
USE realizart;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
