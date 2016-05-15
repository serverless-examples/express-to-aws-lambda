var APIeasy = require('api-easy'),
    assert = require('assert'),
    config = require('./config.json');

function checkHeaders(res) {
  //console.log(res.headers)
  assert.ok(res.headers['last-modified'], 'Last-Modified not set');
  assert.equal(res.headers['x-frame-options'], 'DENY', 'X-Frame-Options not set');
}

function createApiTests(type, port) {
  var suite = APIeasy.describe(type + ' API tests');

  suite.discuss('When using the ' + type + ' API')
       .use('localhost', port)
       .setHeader('Content-Type', 'application/json');

  // create foo
  var fooName = 'test';
  var updatedFooName = 'updated-test';

  suite
    .post('/sessions/create', { username: 'gonto', password: 'gonto' })
      .expect(201)
      .expect('should create session', function (err, res, body) {
        if(err) return;

        var result = JSON.parse(body);
        assert.ok(result.id_token, 'No id_token is set on the response');

        suite.before('setToken', function (outgoing) {
          outgoing.headers['authorization'] = 'Bearer ' + result.id_token;
          return outgoing;
        });
      })
    .next()
    .post('/foo', { name: fooName })
      .expect(200)
      .expect('should create foo', function (err, res, body) {
        if(err) return;
        checkHeaders(res);

        var result = JSON.parse(body);
        assert.ok(result.id, 'No id is set on the response');
        assert.equal(result.name, fooName);

        suite.before('setId', function (outgoing) {
          outgoing.uri = outgoing.uri.replace(':id', result.id);
          return outgoing;
        });
      })
    .next()
    .get('/foo/:id')
      .expect(200)
      .expect('should get created foo', function (err, res, body) {
        if(err || res.statusCode !== 200) return;
        checkHeaders(res);

        var result = JSON.parse(body);
        assert.ok(result.id, 'No id is set on the response');
        assert.equal(result.name, fooName, 'Name was not set');
      })
    .next()
    .put('/foo/:id', { name: updatedFooName })
      .expect(200)
      .expect('should update foo', function (err, res, body) {
        if(err || res.statusCode !== 200) return;
        checkHeaders(res);

        var result = JSON.parse(body);
        assert.ok(result.id);
        assert.equal(result.name, updatedFooName);
      });

  suite
    .export(module);
 }

createApiTests('Express', 5000)
//createApiTests('Lambda', 3000)
