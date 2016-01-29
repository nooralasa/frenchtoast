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
	console.log(req.session.gameId);
	console.log('questionId: '+req.body.quesId);
	console.log('answer: '+req.body.answer);
	Question.addAnswer(req.body.quesId,
										 req.body.answer,
											function (err) {
                        if (err) {
                        	//console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          //console.log('Its all good!');
                          utils.sendSuccessResponse(res);
                        }
                      });

});

router.post('/addQuestion', function (req, res) {
  console.log(req.session.gameId);
  console.log('questionId: '+req.body.quesId);
  Game.addQuestion(req.session.gameId,
                       req.body.quesId,
                      function (err) {
                        if (err) {
                          //console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          //console.log('Its all good!');
                          utils.sendSuccessResponse(res);
                        }
                      });

});

router.post('/wasQuestionAsked', function (req, res) {
  console.log(req.session.gameId);
  console.log('questionId: '+req.body.quesId);
  Game.wasQuestionAsked(req.session.gameId,
                       req.body.quesId,
                      function (err, bool) {
                        if (err) {
                          //console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          //console.log('Its all good!');
                          utils.sendSuccessResponse(res, bool);
                        }
                      });

});

router.post('/gameId', function (req, res) {
  console.log(req.session.gameId);
  
  utils.sendSuccessResponse(res, req.session.gameId);

});

router.get('/gameId', function (req, res, next) {
  console.log(req.session.gameId);
  utils.sendSuccessResponse(res, req.session.gameId);
});

router.get('/game', function (req, res, next) {
  console.log(req.session.gameId);
  Game.findById(req.session.gameId,
                      function (err, game) {
                        if (err) {
                          //console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          //console.log('Its all good!');
                          utils.sendSuccessResponse(res, game);
                        }
                      });
});

module.exports = router;

