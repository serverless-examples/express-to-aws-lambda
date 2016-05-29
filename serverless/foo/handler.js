'use strict';

var dateFormat = require('dateFormat');
var fooService = require('./lib/foo');

function callbackFactory(context, callback) {
  return function(err, foo) {
    if(err) context.fail(err);

    var lastModifiedHeader = dateFormat(foo.lastModified, "ddd, dd mmmm yyyy, h:MM:ss Z");
    var result = {
      lastModifiedHeader: lastModifiedHeader,
      model: foo
    };

    console.log('Returning result: ', result);
    context.done(null, result);
  }
}

module.exports.crudFoo = function(event, context, callback) {
  console.log('Event: ', event);

  switch(event.http_method) {
    case 'GET':
      fooService.get(event.id, callbackFactory(context, callback));
      break;
    case 'PUT':
      fooService.put(event.id, event.body.name, callbackFactory(context, callback));
      break;
    case 'POST':
      fooService.post(event.body.name, callbackFactory(context, callback))
      break;
    default:
      context.fail('Not implemented');
      break;
  }
};
