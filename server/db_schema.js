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

// User Schema
const userSchema = new Schema({
  received: { type: Date, default: Date.now, required: true },
  uid: { type: String },
  urbanSuburbRural: { type: Number },
  
  barRestaurant: { type: Number },
  car: { type: Number },
  school: { type: Number },
  church: { type: Number },
  office: { type: Number },
  home: { type: Number },
  factory: { type: Number },
  kitchen: { type: Number },
  nature: { type: Number },
  cityStreet: { type: Number },
  shoppingGroceries: { type: Number },
  watchingMedia: { type: Number},
  listeningMusic: { type: Number},

  email: {type: String}


});

var gameModel = mongoose.model('Game', gameSchema);
exports.gameModel = gameModel;

var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;

exports.mongoose = mongoose;
