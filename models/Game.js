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

gameSchema.statics.addPlayer = function (playerId, callback) {
  this.findOne({}, {}, { sort: { 'createTime' : -1 } }, function(err, game) {
    game.players.push(playerId);
    game.save();
    callback(null);
  });
}

gameSchema.statics.changeStatus = function (newStatus, callback) {
  this.findOne({}, {}, { sort: { 'createTime' : -1 } }, function(err, game) {
    game.status = newStatus;
    game.save();
    callback(null);
  });
}

gameSchema.statics.findById = function (gameId, callback) {
  this.findOne({ '_id': gameId}, function (err, game) {
    if (err) {
      callback(err);
    } else {
      callback(null, game);
    }
  });
}

gameSchema.statics.wasQuestionAsked = function (gameId, questionId, callback) {
  var bool = true;
  this.findById(gameId, function (err, game) {
    if (err) {
      callback(err);
    } else {
      game.questions.forEach( function (question) {
        if (question==questionId) {
          callback(null, true);
          bool = false;
        } 
      });
      if (bool) {
        callback(null, false);
      } 
    }
  });
}

gameSchema.statics.addQuestion = function (gameId, questionId, callback) {
  this.findById(gameId, function (err, game) {
    if (err) {
      callback(err);
    } else {
      game.addQuestionToDb(questionId, function (er, que) {
        if (er) {
          callback(er);
        } else {
          callback(null, que);
        }
      });
    }
  });
}

gameSchema.statics.addGuess = function (gameId, guess, callback) {
  this.findById(gameId, function (err, game) {
    if (err) {
      callback(err);
    } else {
      game.addGuessToDb(guess, function (er) {
        if (er) {
          callback(er);
        } else {
          if (guess.toLowerCase()==game.concept) {
            callback(null, game.id, true);
          } else {
            callback(null, game.id, false);
          }
        }
      });
    }
  });
}

gameSchema.methods.addQuestionToDb = function (questionId, callback) {
  this.questions.push(questionId);
  this.save();
  callback(null);
}

gameSchema.methods.addGuessToDb = function (guess, callback) {
  this.guesses.push(guess);
  this.save();
  callback(null);
}

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Game", gameSchema);