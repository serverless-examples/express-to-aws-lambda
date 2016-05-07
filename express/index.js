var express = require('express');
var foo = require('./foo');

var app = express();

app.get('/foo/:id', function (req, res) {
  var id = req.params.id;

  foo
    .get(id)
    .then(function(foo) {
      console.log(foo);
      res.status(200).send(foo);
    })
    .catch(function (err) {
      res.status(500).send();
    });
});

app.listen(5000, function () {
  console.log('Listening on port 5000');
});
