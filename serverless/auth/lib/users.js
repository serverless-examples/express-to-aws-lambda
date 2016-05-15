var Promise = require('Promise');
var shortid = require('shortid');
var cache = require('./cache');

exports.getByUsername = function(username) {
  return cache.getObject(username);
}

exports.create = function(username, password, extra) {
  var id = shortid.generate();

  return cache.setObject(username, {
    id: id,
    username: username,
    password: password,
    lastUpdated: new Date()
  });
}
