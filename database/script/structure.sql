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
  
  CREATE TABLE `disney_world`.`movies_characters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movieId` INT NOT NULL,
  `characterId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_movieId_idx` (`movieId` ) ,
  INDEX `fk_characterId_idx` (`characterId` ) ,
  CONSTRAINT `fk_movies_characters_movieId`
    FOREIGN KEY (`movieId`)
    REFERENCES `disney_world`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movies_characters_characterId`
    FOREIGN KEY (`characterId`)
    REFERENCES `disney_world`.`characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
    CREATE TABLE `disney_world`.`movies_genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movieId` INT NOT NULL,
  `genreId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_movies_genres_movieId_idx` (`movieId` ) ,
  INDEX `fk_movies_genres_genreId_idx` (`genreId` ) ,
  CONSTRAINT `fk_movies_genres_movieId`
    FOREIGN KEY (`movieId`)
    REFERENCES `disney_world`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movies_genres_genreId`
    FOREIGN KEY (`genreId`)
    REFERENCES `disney_world`.`genres` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);