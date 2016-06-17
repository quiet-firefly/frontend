var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inviteSchema = new Schema ({
  invite_id: Number,
  hunt_name: Number,
  user_id: Number,
  name: String,
  email: String,
  rsvp_by: Date,
  rsvp_status: String
}, {collection: 'invites'});

mongoose.model('Invite', inviteSchema);
