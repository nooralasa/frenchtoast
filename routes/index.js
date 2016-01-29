var express = require('express');
var router = express.Router();

var utils = require('../utils/utils');
var Player = require('../models/Player');
var Game = require('../models/Game');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// router.get('/current', function (req, res) {
//   Player.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err, ply) { 
//     if (err) {
//         utils.sendErrResponse(res, 500, 'An unknown error occurred.');
//       } else {
//         utils.sendSuccessResponse(res, { player: ply });
//       }
//   });
// });

router.get('/current', function (req, res) {
  console.log('eq.session.playerId: '+req.session.playerId);
  Player.findPlayer(req.session.playerId, function (err, player) {
                        if (err) {
                          console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          console.log(player);
                          console.log('Its all good!');
                          utils.sendSuccessResponse(res, player);
                        }
  });
});

router.post('/', function (req, res) {
  //create a player
	Player.createPlayer(req.body.name,
											req.body.age,
											req.body.gender,
											function (err, player) {
                        if (err) {
                        	console.log('err', err);
                          utils.sendErrResponseGivenError(res, err);
                        } else {
                          //console.log(player._id);
                          req.session.playerId = player._id;
                          req.session.gameId = player.game;
                          //console.log(req.session.player);
                          // Player.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err, ply) { 
                          //   res.setHeader('Set-Cookie', ['playerId='+ply._id]);
                          // });
                          console.log('Its all good!');
                          utils.sendSuccessResponse(res, player);
                        }
                      });

  // //find the current game
  // Game.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err, currGame) {
  //   //find the current player
  //   Player.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err, ply) {
  //     //if waiting for a player then add player to this game
  //     if (currGame && currGame.status == 'waiting') {
  //       console.log('Player type is B');
  //       ply.addTypeAndGame('B', currGame._id, function (err) {});
  //       console.log('see: '+ply.type);
  //       Game.addPlayer(ply, function (err) {
  //         //change game status to active 
  //         Game.changeStatus('active', function (err) {});
  //       });
  //     //else create a game 
  //     } else {
  //       console.log('Player type is A');
  //       Game.createGame(concepts[0], ply, 
  //                   function (err) {
  //                     if (err) {
  //                       console.log('err', err);
  //                     } else {
  //                       console.log('game created');
  //                     }
  //                   });
  //       Game.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err, newG) {
  //         ply.addTypeAndGame('A', newG._id, function (err) {});
  //         console.log('see: '+ply.type);
  //       });
  //     }
  //   });
    
  // });
});

module.exports = router;

