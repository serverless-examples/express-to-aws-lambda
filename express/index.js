var express = require('express');
var bodyParser = require('body-parser');
var dateFormat = require('dateFormat');

var fooService = require('./foo');

var app = express();

app.use(bodyParser.json()); // Parse JSON

app.use(function (req, res, next) {
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

app.use(function (req, res, next) {
  console.log('Express: ' + req.method + ' ' + req.path)
  next();
});

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

app.listen(5000, function () {
  console.log('Listening on port 5000');
});
