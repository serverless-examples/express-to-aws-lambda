'use strict';

var foo = require('../lib/foo');

module.exports.handler = function(event, context, cb) {
  var id = event.id;

  return foo
    .get(id)
    .then(function(foo) {
      return context.done(null, foo);
    })
    .catch(function (err) {
      return context.done(err);
    });
};
