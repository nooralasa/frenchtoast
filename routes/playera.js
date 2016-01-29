var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Player = require('../models/Player');
var Game = require('../models/Game');
var Question = require('../models/Question');

router.get('/', function(req, res, next) {
  res.render('playera');
});

// router.post('/', function (req, res) {

// 	Question.createQuestion(req.body.firstChoice,
// 											req.body.secondChoice,
// 											req.body.answer,
// 											req.session.gameId,
// 											function (err, question) {
//                         if (err) {
//                         	console.log('err', err);
//                           utils.sendErrResponseGivenError(res, err);
//                         } else {
//                           console.log('Its all good!');
//                           utils.sendSuccessResponse(res, question);
//                         }
//                       });

// });

router.post('/', function (req, res) {
	console.log('req: '+req.body);
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

module.exports = router;

