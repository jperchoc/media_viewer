#!/usr/bin/python
import MySQLdb #sudo apt-get install python-pip python-dev libmysqlclient-dev
import fnmatch
import os

if __name__ == "__main__":
  # On initialise le script
  db = MySQLdb.connect("localhost", "root", "root", "media_app")
  rootDir = "mock/*"

  # prepare a cursor object using cursor() method
  cursor = db.cursor()

  # On parcourt les fichiers
  included_extenstions = ['.jpg', '.bmp', '.png', '.gif', '.jpeg']
  for root, dirnames, filenames in os.walk('mock'):
      for filename in fnmatch.filter(filenames, '*'):
          if any(filename.lower().endswith(ext) for ext in included_extenstions):
            media_path = os.path.join(root, filename)
            media_type = 'GIF' if filename.lower().endswith('gif') else 'PHOTO'
            media_libelle = filename
            media_ratings = '0'
            sqlQuery = "INSERT INTO medias (path, type, libelle, ratings) VALUES ('"+media_path+"','"+media_type+"','"+media_libelle+"','"+media_ratings+"');"
            print(sqlQuery)
            cursor.execute(sqlQuery)
            db.commit()
          else: #TODO : videos : create mp4
            print('IGNORED : ' + os.path.join(root, filename))
  db.close()
