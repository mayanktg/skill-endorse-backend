'use strict';
var request = require('request');

var BASE_URL = '/api/v1/';

module.exports = function(app, multiplartMiddleware) {
  try {
    app.use(BASE_URL + 'auth', require('./api/auth'));
    app.use(BASE_URL + 'skills', require('./api/skills'));
    app.use(BASE_URL + 'userskill', require('./api/userSkill'));

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send(err.stack)
      });
  } catch (err) {
    console.log(err);
  }
};
