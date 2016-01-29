var express = require('express');
var router = express.Router();

var utils = require('../utils/utils');
var Player = require('../models/Player');
var Game = require('../models/Game');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/current', function (req, res) {
  Player.findPlayer(req.session.playerId, function (err, player) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res, player);
                        }
  });
});

router.post('/', function (req, res) {

	Player.createPlayer(req.body.name,
											req.body.age,
											req.body.gender,
											function (err, player) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          req.session.playerId = player._id;
                          req.session.gameId = player.game;
                          utils.sendSuccessResponse(res, player);
                        }
                      });

});

module.exports = router;

