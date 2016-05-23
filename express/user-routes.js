// Example adapted from
// -- https://github.com/auth0-blog/nodejs-jwt-authentication-sample/blob/master/user-routes.js

var express = require('express'),
    _       = require('lodash'),
    config  = require('./config.json'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.auth.secret, { expiresIn: 60*60*5 });
}

app.post('/users', function(req, res) {
  var username = req.body.username,
      password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("You must send the username and the password");
  }

  if (_.find(users, { username: username })) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, 'username', 'password', 'extra');
  var maxUser = _.max(users, 'id');
  profile.id = maxUser ? (maxUser.id + 1) : 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

app.post('/sessions/create', function(req, res) {
  var username = req.body.username,
      password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, { username: username });

  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
