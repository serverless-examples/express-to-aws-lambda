var Promise = require('Promise');
var shortid = require('shortid');
var memjs = require('memjs')

var client = memjs.Client.create()
var getObject = function(key) {
  return new Promise(function(resolve, reject) {
    client.get(key, function(err, val) {
      if(err) {
        reject(err);
      } else {
        var item = JSON.parse(val.toString());
        //console.log('Retrieved: ', key, item);
        resolve(item);
      };
    });
  });
}

var setObject = function(key, obj) {
  var item = JSON.stringify(obj);
  return new Promise(function(resolve, reject) {
    client.set(key, item, function(err, stored) {
      if(err) {
        reject(err);
      }
      else {
        //console.log('Set: ', key, obj);
        resolve(obj);
      }
    });
  }, 600);
}

exports.get = function(id) {
  return getObject(id);
}

exports.put = function(id, name) {
  return getObject(id)
    .then(function(foo) {
      foo.name = name;
      return setObject(id, foo);
    });
}

exports.post = function(name) {
  var id = shortid.generate();

  return setObject(id, {
    id: id,
    name: name
  });
}
