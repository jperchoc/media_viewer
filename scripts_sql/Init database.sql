CREATE DATABASE media_app;
USE media_app;

CREATE TABLE `medias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(400) NOT NULL,
  `type` varchar(5) NOT NULL,
  `libelle` varchar(200) NOT NULL,
  `ratings` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(200) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `medias_tags` (
  `id_media` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  PRIMARY KEY (`id_media`, `id_tag`),
  FOREIGN KEY(`id_media`) references medias(`id`),
  FOREIGN KEY(`id_tag`) references tags(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
