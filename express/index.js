var express = require('express');
var bodyParser = require('body-parser')

var fooService = require('./foo');

var app = express();

app.use(bodyParser.json()); // Parse JSON

app.get('/foo/:id', function (req, res) {
  var id = req.params.id;

  fooService
    .get(id)
    .then(function(foo) {
      console.log('Success: ', foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      console.log('Error: ', err);
      res.status(500).send();
    });
});

app.put('/foo/:id', function (req, res) {
  var id = req.params.id;

  fooService
    .put(id, req.body.name)
    .then(function(foo) {
      console.log('Success: ', foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      console.log('Error: ', err);
      res.status(500).send();
    });
});

app.post('/foo', function (req, res) {
  console.log('Recieived request with body: ', req.body)
  fooService
    .post(req.body.name)
    .then(function(foo) {
      console.log('Success: ', foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      console.log('Error: ', err);
      res.status(500).send();
    });
});

app.listen(5000, function () {
  console.log('Listening on port 5000');
});
