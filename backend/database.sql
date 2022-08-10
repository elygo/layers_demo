CREATE DATABASE layersdemo;

CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY GENERATED ALWAYS as IDENTITY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user'
)

INSERT INTO users (name, password, role) values ('test', 'password', 'user')
