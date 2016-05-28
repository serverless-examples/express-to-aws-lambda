'use strict';
var _      = require('lodash'),
    token  = require('../../lib/token'),
    users  = require('../../lib/users');

module.exports.handler = function(event, context, callback) {
  var username = event.body.username,
      password = event.body.password;

  if (!username || !password) {
    return context.fail("You must send the username and the password");
  }

  users.create(username, password, event.body.extra, function(err, user) {
    if(err) {
      context.fail("Error creating user")
      return;
    }

    console.log('Created user');
    var result = {
      id_token: token.createToken(user)
    };

    console.log('Returning result', result);

    context.done(null, result);
    return;
  });
};
