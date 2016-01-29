var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Player = require('../models/Player');
var Game = require('../models/Game');
var Question = require('../models/Question');

router.get('/', function (req, res, next) {
  res.render('playerb');
});

router.get('/gameId', function (req, res, next) {
  utils.sendSuccessResponse(res, req.session.gameId);
});

router.post('/', function (req, res) {
	Question.createQuestion(req.body.firstChoice,
											req.body.secondChoice,
											req.session.gameId,
											function (err, question) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res, question);
                        }
                      });

});

router.post('/guess', function (req, res) {
  Game.addGuess(req.session.gameId,
                      req.body.guess,
                      function (err, gameId, bool) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res, { bool: bool, gameId: gameId});
                        }
                      });

});

module.exports = router;

