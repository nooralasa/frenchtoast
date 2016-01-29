var mongoose = require("mongoose");
var Game = require('./Game');

var questionSchema = mongoose.Schema({
  firstChoice: String, 
  secondChoice: String, 
  answer: String,  
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}, 
  createTime: {type: Date, default: Date.now} //auto timestamp
});

questionSchema.statics.createQuestion = function (choice1, choice2, gameId, callback) {
  this.create(
    {
      firstChoice: choice1,
      secondChoice: choice2,
      game: gameId,
    }, function (err, question) {
      if (err) {
        callback(err);
      } else {
        callback(null, question);
      }
    }
  );
}

questionSchema.statics.findById = function (questionId, callback) {
  this.findOne({ '_id': questionId}, function (err, question) {
    if (err) {
      callback(err);
    } else {
      callback(null, question);
    }
  });
}

questionSchema.statics.addAnswer = function (questionId, questionAnswer, callback) {
  this.findById(questionId, function (err, question) {
    if (err) {
      callback(err);
    } else {
      question.addAnswerToDb(questionAnswer, function (er) {
        if (er) {
          callback(er);
        } else {
          callback(null);
        }
      });
    }
  });
}

questionSchema.methods.addAnswerToDb = function (questionAnswer, callback) {
  this.answer = questionAnswer;
  this.save();
  callback(null);
}

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Question", questionSchema);