var shortid = require('shortid');
var cache = require('./cache');

exports.get = function(id, cb) {
  console.log('Getting foo: ' + id);
  cache.getObject(id, cb);
}

exports.put = function(id, name, cb) {
  console.log('Updating foo: ' + id);

  cache.getObject(id, function(err, foo) {
    if(err) cb(err);

    foo.name = name;
    foo.lastUpdated = new Date();
    cache.setObject(id, foo, cb);
  });
}

exports.post = function(name, cb) {
  console.log('Creating foo with name: ' + name);

  var id = shortid.generate();
  var foo = {
    id: id,
    name: name,
    lastUpdated: new Date()
  };

  console.log('Created foo: ', foo);
  cache.setObject(id, foo, cb);
}
