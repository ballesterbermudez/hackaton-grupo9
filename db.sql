CREATE TABLE `Tiendas` (
	`id` INT(255) NOT NULL AUTO_INCREMENT,
	`nombre` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Productos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombre` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Tiendas_productos` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`id_producto` INT NOT NULL,
	`id_tienda` INT NOT NULL,
	`precio` INT NOT NULL,
	`descripcion` varchar(255) NOT NULL,
	`url` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Usuarios` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`pass` varchar(255) NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`apellido` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Tiendas_productos` ADD CONSTRAINT `Tiendas_productos_fk0` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id`);

ALTER TABLE `Tiendas_productos` ADD CONSTRAINT `Tiendas_productos_fk1` FOREIGN KEY (`id_tienda`) REFERENCES `Tiendas`(`id`);




