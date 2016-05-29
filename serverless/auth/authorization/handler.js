'use strict';
var token = require('../lib/token'),
    AuthPolicy = require('./authPolicy').AuthPolicy;

//TODO https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/

module.exports.handler = function(event, context, callback) {
  console.log('Event: ', event);
  var tokenParts = event.authorizationToken.split(' ');
  if(tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.log('Invalid auth token: ', event.authorizationToken);
    return context.fail('Invalid token');
  }

  token.verifyToken(tokenParts[1], function(err, verifiedJwt) {
    if(err) {
      console.log(err);
      return context.fail("Unauthorized");
    }
    console.log('Got JWT: ', verifiedJwt);

    // parse the ARN from the incoming event
    var apiOptions = {};
    var tmp = event.methodArn.split(':');
    var apiGatewayArnTmp = tmp[5].split('/');
    var awsAccountId = tmp[4];
    apiOptions.region = tmp[3];
    apiOptions.restApiId = apiGatewayArnTmp[0];
    apiOptions.stage = apiGatewayArnTmp[1];

    console.log('Building with policy with: ', awsAccountId, apiOptions)
    var policy = new AuthPolicy(verifiedJwt.username, awsAccountId, apiOptions);

    policy.allowAllMethods();
    // Or define subset based on scop - verifiedJwt.body.scope
    //policy.allowMethod(AuthPolicy.HttpVerb.GET, "*");
    //policy.allowMethod(AuthPolicy.HttpVerb.POST, "/users/" + verifiedJwt.body.sub);
    var result = policy.build();
    console.log('Returning result: ', result, result.policyDocument.Statement);

    context.succeed(result);
  });
};
