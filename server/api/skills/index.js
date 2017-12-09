'use strict';

var express = require('express');
var router = express.Router();
var Skills = require('./skills.controller');

router.get('/getall', Skills.getAllSkills);
router.get('/getskill/:skill_id', Skills.getSkill);
router.post('/createskill', Skills.createSkill);

module.exports = router;
