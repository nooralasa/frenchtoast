var mongoose = require("mongoose");
var Game = require('./Game');

var playerSchema = mongoose.Schema({
  name: String, 
  age: Number, 
  gender: String,  
  // type: String, 
  // game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}, 
  createTime: {type: Date, default: Date.now} //auto timestamp
});

playerSchema.statics.createPlayer = function (playerName, playerAge, playerGender, callback) {
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



// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Player", playerSchema);
