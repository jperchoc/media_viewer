USE media_app;
SELECT * FROM 
medias 
inner join medias_tags on medias.id = medias_tags.id_media 
inner join tags on tags.id = medias_tags.id_tag;
