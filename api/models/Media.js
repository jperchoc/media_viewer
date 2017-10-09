var db = require('../dbconnection');

var Media = {
  getAllMedias: function(callback) {
    return db.query("SELECT medias.id, medias.path, medias.type, medias.libelle as libelle, medias.ratings, tags.libelle as tag FROM medias inner join medias_tags on medias.id = medias_tags.id_media inner join tags on tags.id = medias_tags.id_tag;", callback);
  },
  getMediaById: function(id, callback) {
    return db.query("SELECT medias.id, medias.path, medias.type, medias.libelle as libelle, medias.ratings, tags.libelle as tag FROM medias inner join medias_tags on medias.id = medias_tags.id_media inner join tags on tags.id = medias_tags.id_tag WHERE medias.id=?;", [id], callback);
  },
  addMedia: function(media, callback) {
    //creating request
    let params = [media.path, media.type, media.libelle, media.ratings];
    let request = "INSERT INTO `medias` (path, type, libelle, ratings) VALUES (?, ?, ?, ?);"
    request += "SET @media_id = LAST_INSERT_ID();"
    for (let i = 0; i < media.tags.length; i++) {
      request += "INSERT IGNORE INTO `tags` (libelle) VALUES (?);"
      params.push(media.tags[i]);
      request += "INSERT INTO `medias_tags` (id_media, id_tag) VALUES (@media_id, (SELECT id FROM tags WHERE libelle=?));"
      params.push(media.tags[i]);
    }
    return db.query(request, params, callback);
  },
  updateMedia: function(id, media, callback) {
    let params = [media.path, media.type, media.libelle, media.ratings, id];
    //Update media
    let request = "UPDATE `medias` SET path=?, type=?, libelle=?, ratings=? WHERE id=?;";
    //Delete associated tags
    request += "DELETE FROM `medias_tags` WHERE id_media = ?;"
    params.push(id);
    //Update associated tags
    for (let i = 0; i < media.tags.length; i++) {
      request += "INSERT IGNORE INTO `tags` (libelle) VALUES (?);"
      params.push(media.tags[i]);
      request += "INSERT INTO `medias_tags` (id_media, id_tag) VALUES (?, (SELECT id FROM tags WHERE libelle=?));"
      params.push(id);
      params.push(media.tags[i]);
    }
    //delete unused tags
    request += "DELETE FROM `tags` WHERE id NOT IN (select distinct id_tag from `medias_tags`);"
    return db.query(request, params, callback);
  },
  deleteMedia: function(id, callback) {
    let request = "DELETE FROM `medias_tags` WHERE id_media = ?;"    
    request += "DELETE FROM `medias`WHERE id = ?;"
    request += "DELETE FROM `tags` WHERE id NOT IN (select distinct id_tag from `medias_tags`);"
    return db.query(request, [id, id], callback);
  },
  getTags: function(callback) {
    return db.query("SELECT libelle FROM `tags` ORDER BY (select count(id_tag) FROM `medias_tags` where id_tag = id), libelle;", callback);
  },
  mapMediaAndTags: function(rows) {
    let medias = [];
    let newMedia = { id : -1};
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      if (row.id !== newMedia.id) {
        if (newMedia.id !== -1) {
          medias.push(newMedia);
        }
        newMedia = {
          id:row.id,
          path: row.path,
          type: row.type,
          libelle: row.libelle,
          ratings: row.ratings,
          tags: []
        };
      }
      newMedia.tags.push(row.tag);
    }
    if (newMedia.id !== -1) {
      medias.push(newMedia);
    }
    return medias.length === 1 ? medias[0] : medias;
  },
  mapTagsArray: function(rows) {
    let tags = [];
    for(let i = 0; i < rows.length; i++) {
      tags.push(rows[i].libelle);
    }
    return tags;
  }
};
module.exports = Media;

// TODO : get medias by tag, get medias by similarity, get medias by advanced query
