var jwt    = require('jsonwebtoken'),
    _      = require('lodash'),
    config = require('../../config');

export.createToken = function(user) {
  return jwt.sign(_.omit(user, 'password'), config.auth.secret, { expiresIn: 60*60*5 });
}
