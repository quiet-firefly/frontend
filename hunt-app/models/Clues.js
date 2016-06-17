var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clueSchema = new Schema ({
  hunt_name: Number,
  clue: String,
  location: String,
  placeLat: Number,
  placeLng: Number,
  boundLatHigh: Number,
  boundLatLow: Number,
  boundLngHigh: Number,
  boundLngLow: Number
}, {collection: 'clues'});

mongoose.model('Clue', clueSchema);
