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

gameSchema.statics.findById = function (gameId, callback) {
  console.log('Im in findById');
  this.findOne({ '_id': gameId}, function (err, game) {
    if (err) {
      console.log('I didnt find anything');
      callback(err);
    } else {
      console.log('Im adding an answer');
      callback(null, game);
    }
  });
}

gameSchema.statics.wasQuestionAsked = function (gameId, questionId, callback) {
  console.log('Im in addAnswer');
  var bool = true;
  this.findById(gameId, function (err, game) {
    if (err) {
      callback(err);
    } else {
      // if (game.questions.length==0) {
      //   callback(null, false);
      // }
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
  console.log('Im in addAnswer');
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

gameSchema.methods.addQuestionToDb = function (questionId, callback) {
  console.log('Im in addQuestionToDb');
  this.questions.push(questionId);
  this.save();
  callback(null);
}

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Game", gameSchema);