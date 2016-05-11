var memjs = require('memjs')

var client = memjs.Client.create();

exports.getObject = function(key) {
  return new Promise(function(resolve, reject) {
    client.get(key, function(err, val) {
      if(err) {
        reject(err);
      } else {
        var item = JSON.parse(val.toString());
        resolve(item);
      };
    });
  });
}

exports.setObject = function(key, obj) {
  var item = JSON.stringify(obj);
  return new Promise(function(resolve, reject) {
    client.set(key, item, function(err, stored) {
      if(err) {
        reject(err);
      }
      else {
        resolve(obj);
      }
    });
  }, 600);
}
