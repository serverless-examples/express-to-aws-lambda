'use strict';
var util = require('util');

module.exports.handler = function(event, context, cb) {
  console.log('Recieved lambda event:', util.inspect(event, { depth: 5 }));

  event.Records.forEach(function(evt) {
    if(evt.EventSource !== 'aws:sns') {
      console.warn('Recieved non sns event: ', evt);
      return;
    }

    var message = JSON.parse(evt.Sns.Message);

    console.log('Got job: ', message.name);

  })
  return cb(null, {
    message: 'success'
  });
};
