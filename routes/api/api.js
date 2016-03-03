var express = require('express');
var router = express.Router();
var User = require('../../models/user'),
  Character = require('../../models/character'),
  Campaign = require('../../models/campaign');

router.get('/users/:id', function(req, res, next) {
  var id = req.params.id;
  User.findById(id)
    .lean()
    .populate({
      path: 'campaigns',
      populate: {
        path: 'charSheets',
        model: 'Character',
        match: { 'player': id }
      }
   })
    .exec(function(err, user) {
      // var options = {
      //   path: 'campaigns.charSheets',
      //   model: 'Character'
      // };

      if (err) {
        res.status(500).json(err);
        console.log(err);
      };
      // User.populate(user, options, function(err, user) {
      //   if (err) {
      //     res.status(500).json(err);
      //     console.log(err);
      //   };
      // });
      res.json(user);
    });
});

router.post('/campaign', function(req, res, next) {
  var players = req.body.players.split(", ");

  var campaign = new Campaign({
    gameMaster: req.body.userId
  });

  campaign.save(function(err, campaign) {
    if (err) {
      console.log(err);
      throw err;
    };

    console.log(campaign._id, players);

    User.update({
        'local.email': {
          '$in': players
        }
      }, {
        $addToSet: {
          'campaigns': campaign._id
        }
      },
      function(err, raw) {
        if (err) {
          throw err;
          console.log(err);
        };
        console.log(raw);
      });

    res.status(200).json(campaign);
  });
});

// Character routes
// @todo split routes for chars and campaigns
router.post('/character', function(req, res, next) {
  var id = req.body.userId,
    char = new Character({
      player: id,
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

    User.updateById(id, {$addToSet: {'characters': char._id}},
      function(err, raw) {
        if (err) {
          throw err;
          console.log(err);
        };
        console.log(raw);
      });

    res.status(200).json(char);
  });
});

module.exports = router;
