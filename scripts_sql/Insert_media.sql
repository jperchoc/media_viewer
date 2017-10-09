USE media_app;

INSERT INTO `medias` (path, type, libelle, ratings) VALUES ('mock/03.jpg', 'PHOTO', 'Purple', 5);
SET @media_id = LAST_INSERT_ID();
INSERT IGNORE INTO `tags` (libelle) VALUES ('purple');
INSERT IGNORE INTO `tags` (libelle) VALUES ('wallpapper');
INSERT IGNORE INTO `tags` (libelle) VALUES ('tree');
INSERT INTO `medias_tags` (id_media, id_tag) VALUES (@media_id, (SELECT id FROM tags WHERE libelle='purple'));
INSERT INTO `medias_tags` (id_media, id_tag) VALUES (@media_id, (SELECT id FROM tags WHERE libelle='wallpapper'));
INSERT INTO `medias_tags` (id_media, id_tag) VALUES (@media_id, (SELECT id FROM tags WHERE libelle='tree'));



