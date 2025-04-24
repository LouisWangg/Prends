CREATE DATABASE kleeverse;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(150),
    password VARCHAR(100)
);

CREATE TABLE Psychologists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(150),
    password VARCHAR(100)
);

CREATE TABLE Tapes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price ???,
    quantity ???,
    desc ???,
    discFlag ???,
    discPrice ???
);

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price ???,
    quantity ???,
    desc ???,
    discFlag ???,
    discPrice ???
);