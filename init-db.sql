<<<<<<< HEAD
CREATE DATABASE IF NOT EXISTS cyber2k20;
CREATE TABLE IF NOT EXISTS contactForm (email VARCHAR(255), username VARCHAR(255), content TEXT);
=======
SET GLOBAL time_zone = 'Europe/Prague';
CREATE DATABASE IF NOT EXISTS cyber2k20;
CREATE TABLE IF NOT EXISTS contactForm (email VARCHAR(255), username VARCHAR(255), content TEXT, createdAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP));
>>>>>>> 0f91710 (rate limiter added)
