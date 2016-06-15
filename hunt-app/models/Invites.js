var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inviteSchema = new Schema ({
  invite_id: Number,
  hunt_id: Number,
  user_id: Number,
  email: String,
  rsvp_by: Date,
  rsvp_status: String
}, {collection: 'invites'});

mongoose.model('Invite', inviteSchema);
