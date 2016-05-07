var Promise = require('Promise');

exports.get = function(id) {
  return Promise.resolve({
    id: id,
    type: 'foo'
  });
}
