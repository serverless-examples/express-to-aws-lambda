# Express to AWS Lambda
## What is this?
This repo provides examples of [AWS Lambda](https://aws.amazon.com/lambda/) apps using the [Serverless Framework](https://github.com/serverless/serverless). It contains basic Nodejs apps that use Express framework and the equivalent app on [AWS Lambda](https://aws.amazon.com/lambda/) using the [Serverless Framework](https://github.com/serverless/serverless).

### In this branch
This branch looks at Request Template in the [Serverless Framework](https://github.com/serverless/serverless). Please read the associated [blog post](https://medium.com/@johncmckim/express-to-aws-lambda-part-2-f5183389a3ec) for an explanation.

## Why
AWS Lambda and other compute services (Google Cloud Functions, Azure Functions, ect), are playing an increasingly more important role in Application Architecture.

When I first looked at AWS Lambda it was very unclear to me how to structure and deploy a Lambda based application. I'm hoping these examples will help others that want to learn more about AWS Lambda and the Serverless Framework.

## Examples
Each branch has a different example.

1. [Getting started - basic request and response](https://github.com/johncmckim/express-to-aws-lambda/tree/1-basic) - [Part 1](https://medium.com/@johncmckim/express-to-aws-lambda-part-1-a057096abe34)
2. [Request Templates](https://github.com/johncmckim/express-to-aws-lambda/tree/2-request-templates) - [Part 2](https://medium.com/@johncmckim/express-to-aws-lambda-part-2-f5183389a3ec)
3. [Response Templates](https://github.com/johncmckim/express-to-aws-lambda/tree/3-response-templates) - [Part 3](https://medium.com/@johncmckim/express-to-aws-lambda-part-3-eca9a442f9ff)
4. [Authentication](https://github.com/johncmckim/express-to-aws-lambda/tree/4-authentication) - [Part 4](https://medium.com/@johncmckim/express-to-aws-lambda-part-4-22257f71385f)
5. [Events](https://github.com/johncmckim/express-to-aws-lambda/tree/5-workers) - [Part 5](https://medium.com/@johncmckim/express-to-aws-lambda-part-5-dcde1532279c)

## Reading
If you want to dig deeper into AWS Lambda and Serverless. I recommend reading the documentation for both services.
* [AWS Lambda Docs](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
* [AWS API Gateway Docs](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
* [Serverless Github Repo](https://github.com/serverless/serverless)
* [Serverless docs](http://docs.serverless.com/)
