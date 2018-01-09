var mongoose = require('mongoose');
///////////////////////////////// DB SCHEMAS ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var Schema = mongoose.Schema;


// Game Schema
const gameSchema = new Schema({
  received: { type: Date, default: Date.now, required: true },
  uid: { type: String },
  guesses: [{ type: Number }],
  fileList: [{ type: String, required: true }],
  tLocation: [{ type: Number }],
  vLocations: [[{ type: Number }]],
  fLocations: [{ type: Number }],
  tCorrect: {type: Boolean},
  vPercent: {type: Number},
  falsePositives: {type: Number}

});


var gameModel = mongoose.model('Game', gameSchema);
exports.gameModel = gameModel;

exports.mongoose = mongoose;
