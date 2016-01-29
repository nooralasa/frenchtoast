var express = require('express');
var router = express.Router();

var utils = require('../utils/utils');
var Player = require('../models/Player');
var Game = require('../models/Game');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('playeraInfo');
});

module.exports = router;

