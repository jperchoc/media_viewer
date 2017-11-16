var db = require('../dbconnection');

function decodeQuery(query) {
  //let decodedQuery = unescape(query);
  let decodedQuery = '';
  let query_parts = query.split('&');
  for (let i=0; i<query_parts.length; i++) {
    let part = query_parts[i];
    let partSplit = part.split('=');
    if (partSplit.length != 2) return '';
    let type = partSplit[0];
    let args = partSplit[1].split(',');
    switch (type) {
      case 'tags' :
        decodedQuery += (decodedQuery.length != 0) ? ' AND (' : '(';
        for (let i = 0; i < args.length; i++) {
          if (i != 0 && i != args.length) 
            decodedQuery += ' AND ';
          decodedQuery += `mtags.tags LIKE '%`+args[i]+`%'`;
        }
        decodedQuery += ')';
        break;
      case 'type' :
        decodedQuery += (decodedQuery.length != 0) ? ' AND (' : '(';
        for (let i = 0; i < args.length; i++) {
          if (i != 0 && i != args.length) 
            decodedQuery += ' OR ';
          decodedQuery += `medias.type ='`+args[i]+`'`;
        }
        decodedQuery += ')';
        break;
    }
  }
  return decodedQuery;
}

var Media = {
  getMediasCount : function(query, callback) {
    console.log(query);
    let addquery = decodeQuery(query); 
    console.log(addquery);
    let sql = `select 
                count(medias.id) as nbMedias
              from medias 
              left outer join 
              (
                select id_media, group_concat(tags.libelle order by tags.libelle) as tags
                from medias_tags
                join tags on tags.id = medias_tags.id_tag
                group by id_media
              ) mtags on mtags.id_media = medias.id`   
    if(addquery) {
      sql += ' WHERE ' + addquery;
    }
    console.log(sql);
    return db.query(sql, callback);
  },
  getMedias: function(query, limit, offset, callback) {
    let addquery = decodeQuery(query); 
    let sql = `select 
                medias.id, 
                medias.path, 
                medias.type, 
                medias.libelle, 
                medias.ratings,
                mtags.tags
              from medias 
              left outer join 
              (
                select id_media, group_concat(tags.libelle order by tags.libelle) as tags
                from medias_tags
                join tags on tags.id = medias_tags.id_tag
                group by id_media
              ) mtags on mtags.id_media = medias.id `
              
    if(addquery) {
      sql += 'WHERE ' + addquery;
    }
    sql += `ORDER BY medias.path ` //CHAR_LENGTH(mtags.tags) `//` order by medias.id `
    sql += `limit ` + limit + ` offset ` + offset+`;`
    console.log(sql);
    return db.query(sql, callback);
  },
  getMediaById: function(id, callback) {
    return db.query(`select 
                      medias.id, 
                      medias.path, 
                      medias.type, 
                      medias.libelle, 
                      medias.ratings,
                      mtags.tags
                    from medias 
                    left outer join 
                    (
                      select id_media, group_concat(tags.libelle order by tags.libelle) as tags
                      from medias_tags
                      join tags on tags.id = medias_tags.id_tag
                      group by id_media
                    ) mtags on mtags.id_media = medias.id
                    WHERE medias.id = ?`
    , [id], callback);
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
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      medias.push({
        id:row.id,
        path: row.path,
        type: row.type,
        libelle: row.libelle,
        ratings: row.ratings,
        tags: row.tags ? row.tags.split(',') : []
      });
    }
    return medias;
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
