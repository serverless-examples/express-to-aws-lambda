var jwt    = require('jsonwebtoken'),
    _      = require('lodash'),
    config = require('../config');

exports.createToken = function(user) {
  console.log('Signing with config: ', config)
  return jwt.sign(_.omit(user, 'password'), config.auth.secret, { expiresIn: 60*60*5 });
}

exports.verifyToken = function(token, callback) {
  console.log('Verifying with config: ', config)
  var options = {};
  jwt.verify(token, config.auth.secret, options, callback);
}
