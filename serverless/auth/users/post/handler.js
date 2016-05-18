'use strict';
var _      = require('lodash'),
    token  = require('../../lib/token'),
    users  = require('../../lib/users');

module.exports.handler = function(event, context, cb) {
  var username = event.body.username,
      password = event.body.password;

  if (!username || !password) {
    return cb("You must send the username and the password");
  }

  users.create(username, password, event.body.extra)
    .then(function(user) {
      cb(null, {
        id_token: token.createToken(user)
      });
    })
    .catch(function(err) {
      cb("Error creating user")
    });
};
