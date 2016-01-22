var mongoose = require("mongoose");

var gameSchema = mongoose.Schema({
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Questions'}], 
  concept: String, 
  guesses: [String], 
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  status: {type: String, default: 'waiting'},
  turn: {type: String, default: 'B'}, 
  createTime: {type: Date, default: Date.now} //auto timestamp
});

gameSchema.statics.createGame = function (cnpt, playerId, callback) {
  this.create(
    {
      questions: [],
      concept: cnpt,
      guesses: [],
      players: [playerId],
    }, function (err, game) {
      if (err) {
        callback(err);
      } else {
        callback(null, game);
      }
    }
  );
}

//add_second_player
gameSchema.statics.addPlayer = function (playerId, callback) {
  this.findOne({}, {}, { sort: { 'createTime' : -1 } }, function(err, game) {
    game.players.push(playerId);
    game.save();
    callback(null);
  });
}


//change_status
gameSchema.statics.changeStatus = function (newStatus, callback) {
  this.findOne({}, {}, { sort: { 'createTime' : -1 } }, function(err, game) {
    game.status = newStatus;
    game.save();
    callback(null);
  });
}

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Game", gameSchema);