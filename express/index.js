var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

app.use(function (req, res, next) {
  console.log('Express: ' + req.method + ' ' + req.path);
  //if(req.headers['authorization']) {
  //  console.log('  using Authorization Header: ' + req.headers['authorization'])
  //}
  next();
});

app.use(require('./foo-routes'));
app.use(require('./user-routes'));

var port = process.env.PORT || 5000;

app.listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
