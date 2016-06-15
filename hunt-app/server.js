var path = require('path');
var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var webpack = require('webpack');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

app.post('/api/hunts', function(req, res, next) {
  console.log(req.body);
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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }

  function saveAccount () {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password;

      saveAccount();
    });
  } else {
    saveAccount();
  }
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
