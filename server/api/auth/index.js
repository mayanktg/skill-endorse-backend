'use strict';

var express = require('express');
var router = express.Router();
var Auth = require('./auth.controller');

router.put('/login', Auth.login);
router.post('/createuser', Auth.createUser);
router.put('/updateuser/:user_id', Auth.updateUser);

module.exports = router;
