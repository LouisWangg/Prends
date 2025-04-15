CREATE DATABASE kleeverse;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(150),
    password VARCHAR(100)
);