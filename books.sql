-- -----------------------------------------------------
-- Schema books
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `books`
  DEFAULT CHARACTER SET utf8;
USE `books`;

-- -----------------------------------------------------
-- Table `books`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `books`.`books` (
  `id`     INT         NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(45) NULL,
  `name`   VARCHAR(45) NULL,
  `year`   INT         NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB;