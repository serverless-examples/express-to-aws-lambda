var memjs = require('memjs')

var client = memjs.Client.create();

console.log('Created memjs client', client.servers.map(function(s) {
  return s.host + ':' + s.port;
}));

exports.getObject = function(key, cb) {
  console.log('Getting key: ' + key);

  client.get(key, function(err, val) {
    if(err) {
      console.log('Get failed', err);
      cb(err);
    } else if(val) {
      var item = JSON.parse(val.toString());
      console.log('Get succeeded', item);
      cb(null, item);
    } else {
      console.log('Get returned null');
      cb(null, null);
    }
  });
}

exports.setObject = function(key, obj, cb) {
  var item = JSON.stringify(obj);

  client.set(key, item, function(err, stored) {
    if(err) {
      console.log('Set failed', err);
      cb(err);
    } else {
      console.log('Set succeeded', obj);
      cb(null, obj);
    }
  }, 600);
}
