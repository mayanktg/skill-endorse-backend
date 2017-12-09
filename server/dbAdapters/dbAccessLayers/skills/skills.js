"use strict";

var Promise = require('bluebird');
//Models
var models = require('../../../models');
var Skill = models.skill;

//Promises
Promise.promisifyAll(Skill);

var skill = {};

skill.findOne = function(query, requiredKeys) {
  return Skill.findOneAsync(query, requiredKeys);
}

skill.find = function(query, requiredKeys) {
  return Skill.findAsync(query, requiredKeys);
}

skill.create = function(query) {
  return Skill.createAsync(query);
}

module.exports = skill;

