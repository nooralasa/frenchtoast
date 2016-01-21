var mongoose = require("mongoose");
var Game = require('./Game');

var questionSchema = mongoose.Schema({
  firstChoice: String, 
  secondChoice: String, 
  answer: String,  
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}, 
  createTime: {type: Date, default: Date.now} //auto timestamp
});

// Exporting the mongoose object to be used elsewhere in the code
module.exports = mongoose.model("Question", questionSchema);