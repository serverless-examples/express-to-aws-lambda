'use strict';

var foo = require('../lib/foo');

module.exports.handler = function(event, context, cb) {
  var id = event.id;

  foo
    .get(id)
    .then(function(foo) {
      cb(null, foo);
    })
    .catch(function (err) {
      cb(err);
    });
};
