
import AWS from 'aws-sdk'

const sns = new AWS.SNS();

console.log('starting function');

export default function(event, context, cb) {
  const message = {
    name: event.body.name
  };

  const params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.WORKER_SNS_TOPIC_ARN
  };

  console.log('Publishing job: ', message);

  sns.publish(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      return context.fail('Unexpected Error')
    } else {
      console.log('Successfully published job: ', data);           // successful response
      return context.succeed({
        job: event.body.name
      });
    }
  });
};
