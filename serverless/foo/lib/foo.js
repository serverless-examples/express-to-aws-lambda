var Promise = require('Promise');
var shortid = require('shortid');
var cache = require('./cache');

exports.get = function(id) {
  return cache.getObject(id);
}

exports.put = function(id, name) {
  return cache.getObject(id)
    .then(function(foo) {
      foo.name = name;
      return cache.setObject(id, foo);
    });
}

exports.post = function(name) {
  var id = shortid.generate();

  return cache.setObject(id, {
    id: id,
    name: name
  });
}
