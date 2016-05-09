'use strict';

var fooService = require('../lib/foo');

module.exports.handler = function(event, context, cb) {
  var id = event.id;

  fooService
    .get(id)
    .then(function(foo) {
      cb(null, foo);
    })
    .catch(function (err) {
      cb(err);
    });
};
