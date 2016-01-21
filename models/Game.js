var mongoose = require("mongoose");

var gameSchema = mongoose.Schema({
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Questions'}], 
  concept: String, 
  guesses: [String], 
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}], 
  createTime: {type: Date, default: Date.now} //auto timestamp
});

gameSchema.statics.createGame = function (cnpt) {
  this.create(
    {
      questions: [],
      concept: cnpt,
      guesses: [],
      players: [],
    }, function (err, player) {
      if (err) {
        callback(err);
      } else {
        callback(null, player);
      }
    }
  );
}

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Game", gameSchema);