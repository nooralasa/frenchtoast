var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Player = require('../models/Player');
var Game = require('../models/Game');
var Question = require('../models/Question');

router.get('/', function(req, res, next) {
  res.render('playera');
});

router.post('/', function (req, res) {
	Question.addAnswer(req.body.quesId,
										 req.body.answer,
											function (err) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res);
                        }
                      });

});

router.post('/addQuestion', function (req, res) {
  Game.addQuestion(req.session.gameId,
                       req.body.quesId,
                      function (err) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res);
                        }
                      });

});

router.post('/wasQuestionAsked', function (req, res) {
  Game.wasQuestionAsked(req.session.gameId,
                       req.body.quesId,
                      function (err, bool) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res, bool);
                        }
                      });

});

router.get('/gameId', function (req, res, next) {
  utils.sendSuccessResponse(res, req.session.gameId);
});

router.get('/game', function (req, res, next) {
  Game.findById(req.session.gameId,
                      function (err, game) {
                        if (err) {
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res, game);
                        }
                      });
});

module.exports = router;

