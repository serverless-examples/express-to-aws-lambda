'use strict';

import { AuthPolicy } from './authPolicy';

//TODO https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/

export default function(event, context, callback) {
  console.log('Event: ', event);
  if(!event.authorizationToken) {
    return context.fail('Invalid token');
  }

  if(event.authorizationToken === 'fail') {
    return context.fail("Unauthorized");
  }

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
};
