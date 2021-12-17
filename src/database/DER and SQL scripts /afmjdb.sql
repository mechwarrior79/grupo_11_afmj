CREATE DATABASE IF NOT EXISTS `afmjdb`;
USE `afmjdb`;

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `mainDescription` VARCHAR(255) NOT NULL,
   `secondaryDescription` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255),
   `price` INT NOT NULL,
   `discount` INT NOT NULL,
   `categoryId` INT NOT NULL,
   `statusId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `statuses` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `status` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `surname` VARCHAR(100) NOT NULL,
   `birthDate` DATE NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255),
   `roleId` INT NOT NULL,
   `sexId` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `sexes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `sex` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);


CREATE TABLE `roles` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `role` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_e6bfe125-33fb-4758-ae51-bb069a668cf2` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_e580169d-ca26-4a68-9401-cf14d94d1f9e` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_132e1e7d-aed9-407b-9402-043eb17ed85e` FOREIGN KEY (`sexId`) REFERENCES `sexes`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_e8c52e6f-d69d-454d-b79f-ff7b41d2b754` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)  ;
