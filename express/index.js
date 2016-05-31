var express = require('express');
var bodyParser = require('body-parser');
var jackrabbit = require('jackrabbit');

var TASK_QUEUE_KEY = 'task_queue';
var RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost'

var rabbit = jackrabbit(RABBIT_URL);
var exchange = rabbit.default();

var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log('Express: ' + req.method + ' ' + req.path)
  next();
});

app.post('/jobs', function(req, res) {
    exchange.publish(req.body.name, { key: TASK_QUEUE_KEY });
    res.status(201).send();
});

var port = process.env.PORT || 5000;

app.listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
