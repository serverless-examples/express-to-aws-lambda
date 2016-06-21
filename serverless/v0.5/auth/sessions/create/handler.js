'use strict';
var _      = require('lodash'),
    token = require('../../lib/token'),
    users  = require('../../lib/users');

module.exports.handler = function(event, context, callback) {
  console.log('Starting create session');

  var username = event.body.username,
      password = event.body.password;

  if (!username || !password) {
    return context.fail("You must send the username and the password");
  }

  return users.getByUsername(username, function(err, user) {
    if(err) {
      console.log('Error getting user', err)
      context.fail("The username or password don't match")
      return;
    }
    console.log('User: ', user);
    console.log('Password: ', password);

    if (user.password !== password) { //TODO: 401
      context.fail("The username or password is incorrect");
      return;
    }
    var result = {
      id_token: token.createToken(user)
    };

    console.log('Returning result', result);

    context.done(null, result);
    return;
  });
};
