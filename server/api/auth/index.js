'use strict';

var express = require('express');
var router = express.Router();
var Auth = require('./auth.controller');

router.put('/login', Auth.login);
router.post('/createuser', Auth.createUser);
router.get('/getuser/:user_id', Auth.getUser);
router.put('/updateuser/:user_id', Auth.updateUser);

module.exports = router;
