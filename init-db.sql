CREATE DATABASE IF NOT EXISTS cyber2k20;
CREATE TABLE IF NOT EXISTS contactForm (email VARCHAR(255), username VARCHAR(255), content TEXT);
CREATE TABLE IF NOT EXISTS userData (userIP TEXT, userAgent TEXT, userLanguage TEXT, userEmail TEXT);