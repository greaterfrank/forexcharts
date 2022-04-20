-- mysql -uuser -ppass -D fxratedb <createdb.sql
CREATE DATABASE IF NOT EXISTS FXRATEDB;
--CREATE USER IF NOT EXISTS 'dbuser'@'%' IDENTIFIED BY 'dbpass';
--GRANT ALL PRIVILEGES ON * . * TO 'dbuser'@'%';
CREATE USER IF NOT EXISTS 'dbuser' IDENTIFIED BY 'dbpass';
GRANT ALL PRIVILEGES ON * . * TO 'dbuser';
FLUSH PRIVILEGES;