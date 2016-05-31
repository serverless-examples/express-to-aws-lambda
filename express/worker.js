
var jackrabbit = require('jackrabbit');

var TASK_QUEUE_KEY = 'task_queue';
var RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost'

var rabbit = jackrabbit(RABBIT_URL);
var exchange = rabbit.default();
var taskQueue = exchange.queue({ name: TASK_QUEUE_KEY, durable: true });


taskQueue.consume(function(key, ack) {
  console.log('Got job: ', key);
  ack();
});
