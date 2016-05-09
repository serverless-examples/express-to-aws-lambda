var request = require('request');

var baseUrl = process.argv[2];

var fooOne = { name: 'fooOne' };

request.post(baseUrl + '/foo', JSON.stringify(fooOne), function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('Created foo: ', body);
  }
})
