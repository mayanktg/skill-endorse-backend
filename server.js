var express = require('express');
var app = express();
var port = process.env.PORT || 9000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/config');
var routes = require('./server/routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
