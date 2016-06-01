'use strict';
var AWS = require('aws-sdk');
var sns = new AWS.SNS();

module.exports.handler = function(event, context, cb) {
  var message = {
    name: event.body.name
  };

  var params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.WORKER_SNS_TOPIC_ARN
  };

  sns.publish(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      return context.fail('Unexpected Error')
    } else {
      console.log(data);           // successful response
      return context.succeed({
        job: event.body.name
      });
    }
  });
};
