var express = require('express');
var router = express.Router();
var Character = require('../../models/character');

router.post('/character', function(req, res, next) {
  var char = new Character({
    player: req.body.userId,
    name: req.body.name,
    race: req.body.race,
    charClass: req.body.charClass,
    alignment: req.body.alignment
  });

  char.save(function(err, char) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(char);
  });
});

module.exports = router;
