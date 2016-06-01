var APIeasy = require('api-easy'),
    assert = require('assert');

function createApiTests(type, host, port, path, secure) {
  var suite = APIeasy.describe(type + ' API tests');

  suite.discuss('When using the ' + type + ' API')
       .use(host, port, { secure: secure })
       .setHeader('Content-Type', 'application/json');
  if(path) {
    suite.path(path);
  }

  suite
    .post('/jobs', { name: 'test-job' })
    .expect(201)

  suite.export(module);
 }

createApiTests('Express', 'localhost', 5000, '', false)
createApiTests('Lambda', 'nmlu6z34zl.execute-api.us-east-1.amazonaws.com', 443, 'dev', true)
