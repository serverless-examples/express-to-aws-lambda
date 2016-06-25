
import foo from './foo.js'

console.log('starting function');

export default function(event, context, cb) {
  var id = event.id;

  foo
    .get(id)
    .then(function(foo) {
      cb(null, foo);
    })
    .catch(function (err) {
      cb(err);
    });
};
