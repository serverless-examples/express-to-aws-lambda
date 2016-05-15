'use strict';
var _      = require('lodash'),
    token = require('../../lib/token'),
    users  = require('../../lib/users');

module.exports.handler = function(event, context, cb) {
  var username = event.body.username,
      password = event.body.password;

  if (!username || !password) {
    return cb("You must send the username and the password");
  }

  users.getByUsername(username)
    .then(function(user) {
      if (user.password !== password) {
        //TODO: 401
        cb("The username or password don't match")
      }

      cb(null, {
        id_token: token.createToken(profile)
      });
    })
    .catch(function(err) {
      //TODO: 401
      cb("The username or password don't match")
    });
};
