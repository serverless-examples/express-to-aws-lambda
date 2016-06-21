var shortid = require('shortid');
var cache = require('./cache');

exports.getByUsername = function(username, cb) {
  console.log('Getting user: ', username);
  cache.getObject(username, cb);
}

exports.create = function(username, password, extra, cb) {
  var id = shortid.generate();
  var user = {
    id: id,
    username: username,
    password: password,
    lastUpdated: new Date()
  };

  console.log('Creating user', user);

  cache.setObject(username, user, cb);
}
