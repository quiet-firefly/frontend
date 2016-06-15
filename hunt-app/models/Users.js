var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
  user_id: Number,
  email: String,
  password: String,
  oauth: String,
  token: String,
  first_name: String,
  last_name: String
}, {collection: 'users'});

mongoose.model('User', userSchema);
