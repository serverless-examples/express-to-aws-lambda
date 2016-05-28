var shortid = require('shortid');
var cache = require('./cache');

exports.get = function(id, cb) {
  cache.getObject(id, cb);
}

exports.put = function(id, name, cb) {
  cache.getObject(id, function(foo) {
    if(err) cb(err);

    foo.name = name;
    foo.lastUpdated = new Date();
    cache.setObject(id, foo, cb);
  });
}

exports.post = function(name, cb) {
  var id = shortid.generate();
  var foo = {
    id: id,
    name: name,
    lastUpdated: new Date()
  };
  cache.setObject(id, foo, cb);
}
