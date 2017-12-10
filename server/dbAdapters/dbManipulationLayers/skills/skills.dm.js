'use strict';

var DbaSkills = require('../../dbAccessLayers').skills;
var ErrorCode = require('../../../error').errorCodes;
var async = require('async');
var _ = require('lodash');

var skillsDmLayer = {};

skillsDmLayer.getAll = function() {
  var query = {};
  var requiredFields = 'name __v';
  return DbaSkills.find(query, requiredFields);
}

skillsDmLayer.findOneById = function(id) {
  var query = { _id: id };
  var requiredFields = 'name';
  return DbaSkills.findOne(query, requiredFields);
}

skillsDmLayer.createSkill = function(name) {
  var query = { name: name };
  return DbaSkills.create(query);
}

module.exports = skillsDmLayer;
