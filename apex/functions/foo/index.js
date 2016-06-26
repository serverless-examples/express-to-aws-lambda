
import foo from './foo.js'

console.log('starting function');

export default function(event, context, cb) {
  const callback = (err, result) => {
    console.log('Sending result: ', err, result);
    context.done(err, result);
  };

  switch(event.http_method) {
    case 'GET':
      foo.get(event.id, callback);
      break;
    case 'PUT':
      foo.put(event.id, event.body.name, callback);
      break;
    case 'POST':
      foo.post(event.body.name, callback);
      break;
    case 'DELETE':
      foo.delete(event.id, callback);
      break;
    default:
      context.fail('Not implemented');
  }
};
