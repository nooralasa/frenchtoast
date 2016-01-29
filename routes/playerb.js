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
  console.log(req.session.gameId);
  utils.sendSuccessResponse(res, req.session.gameId);
});

router.post('/', function (req, res) {
  console.log(req.session.gameId);
	Question.createQuestion(req.body.firstChoice,
											req.body.secondChoice,
											req.session.gameId,
											function (err, question) {
                        if (err) {
                        	console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          console.log('req.session.gameId: '+req.session.gameId);
                          console.log('Its all good!');
                          utils.sendSuccessResponse(res, question);
                        }
                      });

});

module.exports = router;

