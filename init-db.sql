CREATE DATABASE IF NOT EXISTS cyber2k20;

DROP TABLE IF EXISTS contactForm;
CREATE TABLE IF NOT EXISTS contactForm (
    email VARCHAR(255), 
    username VARCHAR(255), 
    content TEXT
);

DROP TABLE IF EXISTS userData;
CREATE TABLE IF NOT EXISTS userData (
    userIP TEXT, 
    userAgent TEXT, 
    userLanguage TEXT, 
    userReferer TEXT, 
    userDate TEXT
);