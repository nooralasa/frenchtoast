var express = require('express');
var router = express.Router();

var Player = require('../models/Player');
var Game = require('../models/Game');

router.get('/', function(req, res, next) {
  res.render('playerb');
});

module.exports = router;

