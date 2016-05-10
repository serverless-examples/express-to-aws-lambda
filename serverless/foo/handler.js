'use strict';

var fooService = require('./lib/foo');

function get(event, context, cb) {
  fooService
    .get(event.id)
    .then(function(foo) {
      cb(null, foo);
    })
    .catch(function (err) {
      cb(err);
    });
}

function post(event, context, cb) {
  fooService
    .post(event.body.name)
    .then(function(foo) {
      cb(null, foo);
    })
    .catch(function (err) {
      cb(err);
    });
}

function put(event, context, cb) {
  fooService
    .put(event.id, event.body.name)
    .then(function(foo) {
      cb(null, foo);
    })
    .catch(function (err) {
      cb(err);
    });
}

module.exports.crudFoo = function(event, context, cb) {

  switch(event.http_method) {
    case 'GET':
      get(event, context, cb);
      break;
    case 'PUT':
      put(event, context, cb);
      break;
    case 'POST':
      post(event, context, cb);
      break;
    default:
      cb('Not implemented');
  }

};
