var express = require('express');
var router = express.Router();
var Media = require('../models/Media')

/* GET home page. */
router.get('/medias/:id?', function (req, res, next) {
  if (req.params.id) {
    Media.getMediaById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(Media.mapMediaAndTags(rows));
      }
    });
  }
  else {
    Media.getAllMedias(function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(Media.mapMediaAndTags(rows));
      }
    });
  }
});
router.post('/medias', function(req, res, next) {
  Media.addMedia(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});
router.put('/medias/:id', function(req, res, next) {
  Media.updateMedia(req.params.id, req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});
router.delete('/medias/:id', function(req, res, next) {
  Media.deleteMedia(req.params.id, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.get('/tags/', function (req, res, next) {
    Media.getTags(function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(Media.mapTagsArray(rows));
      }
    });
  });

module.exports = router;
