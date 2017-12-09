'use strict';

var express = require('express');
var router = express.Router();
var UserSkill = require('./userSkill.controller');

router.get('/getuserskill/:user_id', UserSkill.getSkillByUserId);
router.put('/updateendorsestatus', UserSkill.updateEndorseStatus);
router.post('/createuserskill', UserSkill.createUserSkill);

module.exports = router;
