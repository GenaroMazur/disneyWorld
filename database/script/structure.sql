CREATE SCHEMA `disney_world` ;

CREATE TABLE `disney_world`.`characters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `weigth` INT NULL,
  `history` LONGTEXT NULL,
  `image` VARCHAR(60) NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `disney_world`.`movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tittle` VARCHAR(45) NOT NULL,
  `dateCreation` DATE NULL,
  `calification` INT NULL DEFAULT 1,
  `image` VARCHAR(60),
  PRIMARY KEY (`id`));
  
CREATE TABLE `disney_world`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image` VARCHAR(60) NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `disney_world`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `create_at` DATE NULL,
  `delete_at` DATE NULL,
  `update_at` DATE NULL,
  `verify` INT(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ) );
  
  CREATE TABLE `disney_world`.`movies_charapters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idMovie` INT NOT NULL,
  `idCharapter` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_idMovie_idx` (`idMovie` ) ,
  INDEX `fk_idCharapter_idx` (`idCharapter` ) ,
  CONSTRAINT `fk_movies_charapters_idMovie`
    FOREIGN KEY (`idMovie`)
    REFERENCES `disney_world`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movies_charapters_idCharapter`
    FOREIGN KEY (`idCharapter`)
    REFERENCES `disney_world`.`characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
    CREATE TABLE `disney_world`.`movies_genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idMovie` INT NOT NULL,
  `idGenre` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_movies_genres_idMovie_idx` (`idMovie` ) ,
  INDEX `fk_movies_genres_idGenre_idx` (`idGenre` ) ,
  CONSTRAINT `fk_movies_genres_idMovie`
    FOREIGN KEY (`idMovie`)
    REFERENCES `disney_world`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movies_genres_idGenre`
    FOREIGN KEY (`idGenre`)
    REFERENCES `disney_world`.`genres` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);