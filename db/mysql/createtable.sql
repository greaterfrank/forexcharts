-- USE FXRATEDB;
DROP TABLE IF EXISTS FXUSDCAD;
CREATE TABLE FXUSDCAD (
  `Time` timestamp NOT NULL,
  `Open` float NOT NULL,
  `High` float NOT NULL,
  `Low` float NOT NULL,
  `Close` float NOT NULL,
  `Volume` int NOT NULL,
  PRIMARY KEY (`time`)
);