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
  console.log('Im in findById');
  this.findOne({ '_id': questionId}, function (err, question) {
    if (err) {
      console.log('I didnt find anything');
      callback(err);
    } else {
      console.log('Im adding an answer');
      callback(null, question);
    }
  });
}

questionSchema.statics.addAnswer = function (questionId, questionAnswer, callback) {
  console.log('Im in addAnswer');
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

// questionSchema.statics.addAnswer = function (questionId, questionAnswer, callback) {
//   console.log('Im in addAnswer');
//   this.findOne({}, {}, { sort: { 'createTime' : -1 } }, function (err1, question) {         
//     if (err) {
//       callback(err);
//     } else {
//       question.addAnswerToDb(questionAnswer, function (er) {
//         if (er) {
//           callback(er);
//         } else {
//           callback(null);
//         }
//       });
//     }
//   });
// }

      

// questionSchema.statics.addAnswer = function (questionId, questionAnswer, callback) {
//   this.findOne({ '_id': questionId}, function (err, question) {
//     if (err) {
//       console.log('I didnt find anything');
//       callback(err);
//     } else {
//       console.log('Im adding an answer');
//       question.answer = questionAnswer;
//       question.save();
//       callback(null);
//     }
//   });
// }

//find_player_by_everything
questionSchema.methods.addAnswerToDb = function (questionAnswer, callback) {
  console.log('Im in addAnswerToDb');
  this.answer = questionAnswer;
  this.save();
  callback(null);
}

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Question", questionSchema);