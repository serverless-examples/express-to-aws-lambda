'use strict';

module.exports.handler = function(event, context, cb) {
  console.log(event);
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
