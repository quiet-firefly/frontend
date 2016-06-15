var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clueSchema = new Schema ({
  clue_id: Number,
  hunt_id: Number,
  clue: String,
  location: String,
  latitude: Number,
  longitude: Number
}, {collection: 'clues'});

mongoose.model('Clue', clueSchema);
