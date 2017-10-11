var express = require('express');
var router = express.Router();
var Media = require('../models/Media')

/* GET home page. */
router.get('/medias/:id', function (req, res, next) {
    Media.getMediaById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(Media.mapMediaAndTags(rows)[0]);
      }
    });
  });
router.get('/medias/query/:query', function (req, res, next) {
  let limit = req.query.limit ? req.query.limit : 20;
  let offset = req.query.offset ? req.query.offset : 0;
  Media.getMedias(req.params.query, limit, offset, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(Media.mapMediaAndTags(rows));
    }
  });
});
router.get('/medias/query/:query/count', function (req, res, next) {
  Media.getMediasCount(req.params.query, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
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
