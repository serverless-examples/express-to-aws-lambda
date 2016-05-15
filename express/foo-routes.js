
var express    = require('express'),
    jwt        = require('express-jwt'),
    dateFormat = require('dateFormat'),
    fooService = require('./lib/foo'),
    config     = require('./config.json');

var app = module.exports = express.Router();

app.use('/foo', jwt({ secret: config.auth.secret }));

function setLastModified(res, foo) {
  res.setHeader("Last-Modified", dateFormat(foo.lastModified, "ddd, dd mmmm yyyy, h:MM:ss Z"));
}

app.get('/foo/:id', function (req, res) {
  var id = req.params.id;

  fooService
    .get(id)
    .then(function(foo) {
      setLastModified(res, foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      res.status(500).send();
    });
});

app.put('/foo/:id', function (req, res) {
  var id = req.params.id;

  fooService
    .put(id, req.body.name)
    .then(function(foo) {
      setLastModified(res, foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      res.status(500).send();
    });
});

app.post('/foo', function (req, res) {
  var name = req.body.name;

  fooService
    .post(name)
    .then(function(foo) {
      setLastModified(res, foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      res.status(500).send();
    });
});
