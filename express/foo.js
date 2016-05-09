var Promise = require('Promise');
var shortid = require('shortid');

var foos = {};

exports.get = function(id) {
  var foo = foos[id];
  if(!foo) {
    return Promise.reject('Cannot find foo with id: ' + id);
  }

  return Promise.resolve(foo);
}

exports.put = function(id, name) {
  var foo = foos[id];
  if(!foo) {
    return Promise.reject('Cannot find foo with id: ' + id);
  }

  foo.name = name;
  return Promise.resolve(foo);
}

exports.post = function(name) {
  var foo = {
    id: shortid.generate(),
    name: name
  };

  return Promise.resolve(foo);
}
