var path = require('path');
var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var webpack = require('webpack');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var Form = require('react-formal');
var yup = require('yup');

var app = express();
var compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/scavenger');
require('./models/Hunts');
require('./models/Users');
require('./models/Clues');
require('./models/Invites');

var db = mongoose.connection;
var Hunt = mongoose.model('Hunt');
var User = mongoose.model('User');
var Clue = mongoose.model('Clue');
var Invite = mongoose.model('Invite');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we connected to the Scavenger db!")
})

app.get('/api/hunts', function(req, res) {
  Hunt.find(function(err, hunts) {
    if (err) { next(err); }

    res.json(hunts);
  })
});

app.param('huntname', function(req, res, next, huntname) {
  var query = Hunt.findOne({ hunt_name: huntname });

  console.log("param huntname call is working");

  query.exec(function (err, hunt) {
    if (err) {return next(err); }
    if (!hunt) {return next(new Error("can't find hunt")); }

    req.hunt = hunt;
    return next();
  })
})

app.get('/api/hunts/:huntname', function(req, res) {
  console.log("this is the wildcard huntname call")
    res.json(req.hunt)
});

app.post('/api/hunts', function(req, res, next) {
  var hunt_name = req.body.hunt_name;
  var date = req.body.date;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;
  var location = req.body.location;
  var description = req.body.description;

  db.collections.hunts.insert({
    hunt_name: hunt_name,
    date: date,
    start_time: start_time,
    end_time: end_time,
    location: location,
    description: description
  })
});

app.get('/api/users', function(req, res) {
  User.find(function(err, users) {
    if (err) { next(err); }

    res.json(users);
  })
});

app.get('/api/clues', function(req, res) {
  Clue.find(function(err, clues) {
    if (err) { next(err); }

    res.json(clues);
  })
});

app.post('/api/clues', function(req, res, next) {
  console.log("This is logging a POST to Clues" + req.body);
  var hunt_id = req.body.hunt_id;
  var clue = req.body.clue;
  var location = req.body.location;
  var boundLngHigh = req.body.boundLngHigh;
  var boundLngLow = req.body.boundLngLow;
  var boundLatHigh = req.body.boundLatHigh;
  var boundLatLow = req.body.boundLatLow;
  var placeLat = req.body.placeLat;
  var placeLng = req.body.placeLng;

  db.collections.clues.insert({
    hunt_id: hunt_id,
    clue: clue,
    location: location,
    boundLngHigh: boundLngHigh,
    boundLngLow: boundLngLow,
    boundLatHigh: boundLatHigh,
    boundLatLow: boundLatLow,
    placeLat: placeLat,
    placeLng: placeLng
  })
});

app.get('/api/invites', function(req, res) {
  Invite.find(function(err, invites) {
    if (err) { next(err); }

    res.json(invites);
  })
});

app.post('/api/invites', function(req, res, next) {
  console.log(req.body);
  var hunt_id = req.body.hunt_id;
  var name = req.body.name;
  var email = req.body.email;
  var rsvp_by = req.body.rsvp_by;

  db.collections.invites.insert({
    hunt_id: hunt_id,
    name: name,
    email: email,
    rsvp_by: rsvp_by
  })
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(stormpath.init(app, {
  web: {
    produces: ['application/json']
  }
}));

app.get('/css/materialize.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/materialize.min.css'));
});

app.get('/js/materialize.min.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/materialize/js/materialize.min.js'));
});

app.use(express.static('build'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.on('stormpath.ready', function () {
  app.listen(3000, 'localhost', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Listening at http://localhost:3000');
  });
});
