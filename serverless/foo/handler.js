'use strict';

var dateFormat = require('dateFormat');
var fooService = require('./lib/foo');

function successFactory(cb) {
  return function(foo) {
    var lastModifiedHeader = dateFormat(foo.lastModified, "ddd, dd mmmm yyyy, h:MM:ss Z");
    cb(null, {
      lastModifiedHeader: lastModifiedHeader,
      model: foo
    });
  }
}

function errorFactory(cb) {
  return function (err) {
    cb(err);
  }
}

function get(event, context, cb) {
  fooService
    .get(event.id)
    .then(successFactory(cb))
    .catch(errorFactory(cb));
}

function post(event, context, cb) {
  fooService
    .post(event.body.name)
    .then(successFactory(cb))
    .catch(errorFactory(cb));
}

function put(event, context, cb) {
  fooService
    .put(event.id, event.body.name)
    .then(successFactory(cb))
    .catch(errorFactory(cb));
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
