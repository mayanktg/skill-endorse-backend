"use strict";

var Promise = require('bluebird');
//Models
var models = require('../../../models');
var UserSkill = models.userSkill;

//Promises
Promise.promisifyAll(UserSkill);

var userSkill = {};

userSkill.find = function(query, requiredKeys) {
  return UserSkill.find(query, requiredKeys)
    .populate('skill_id')
    .populate('endorser_user_id');
}

userSkill.create = function(query) {
  return UserSkill.createAsync(query);
}

userSkill.update = function(query, updateQuery, options) {
  return UserSkill.updateAsync(query, updateQuery, options);
}

module.exports = userSkill;

