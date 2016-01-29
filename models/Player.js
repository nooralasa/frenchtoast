var mongoose = require("mongoose");
var Game = require('./Game');
var concepts = ['Jellyfish'];

var playerSchema = mongoose.Schema({
  name: String, 
  age: Number, 
  gender: String,  
  type: String, 
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}, 
  createTime: {type: Date, default: Date.now} //auto timestamp
});

playerSchema.statics.createNewPlayer = function (playerName, playerAge, playerGender, callback) {
  this.create(
    {
      name: playerName,
      age: playerAge,
      gender: playerGender
    }, function (err, player) {
      if (err) {
        callback(err);
      } else {
        callback(null, player); 
      }
    }
  );
}

playerSchema.statics.createPlayer = function (playerName, playerAge, playerGender, callback) {
  this.createNewPlayer(playerName, playerAge, playerGender,
    function (err, ply) {  
      if (err) {       
        callback(err);
      } else {      
        //find the current game
        Game.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err1, currGame) {         
          if (err1) {          
            callback(err1);
          } else {     
            //if waiting for a player then add player to this game
            if (currGame && currGame.status == 'waiting') {           
              ply.addTypeAndGame('B', currGame._id, function (err2) { if (err2) { callback(err2);} });
              Game.addPlayer(ply, function (err3) {           
                //change game status to active 
                Game.changeStatus('active', function (err4) { if (err4) { callback(err4);} });
                if (err3) {                  
                  callback(err3);
                } else {                  
                  callback(null, ply);
                }
              });
            //else create a game 
            } else {
              Game.createGame(concepts[0], ply, 
                          function (err7) {
                            if (err7) {                          
                              callback(err7);
                            } else {                              
                              console.log('game created');
                            }
                          });
              Game.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err8, newG) {    
                ply.addTypeAndGame('A', newG._id, function (err9) { if (err9) { callback(err8);} });
                if (err8) {
                  callback(err8);
                } else {
                  callback(null, ply);
                }
              });
            }   
          }   
        });         
      }
    });
}

playerSchema.statics.findPlayer = function (playerId, callback) {
  this.findOne({'_id': playerId}, function (err, player) {
    if (err) {
      callback(err);
    } else {
      callback(null, player);
    }
  });
}

//find_player_by_everything
playerSchema.methods.addTypeAndGame = function (playerType, gameId, callback) {
  this.type = playerType;
  this.game = gameId;
  this.save();
  callback(null);
}




// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Player", playerSchema);
