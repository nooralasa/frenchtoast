var express = require('express');
var router = express.Router();

var utils = require('../utils/utils');
var Player = require('../models/Player');
var Game = require('../models/Game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function (req, res) {
	Player.createPlayer(req.body.name,
											req.body.age,
											req.body.gender,
											function (err) {
                        if (err) {
                        	console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          utils.sendSuccessResponse(res);
                        }
                      }
	);
});

module.exports = router;

