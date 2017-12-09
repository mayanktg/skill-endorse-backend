'use strict';
//------------------------- PACKAGES---------------------------- //
var Promise = require('bluebird');
var _ = require('lodash');
var async = require('async');

//-------------------------- SERVICES --------------------------//
var Success = require('../../responses');
var request = require('request');
var Errors = require('../../error').errors;
var Error = require('../../error');
var ErrorCodes = Error.errorCodes;

//--------------------------- MODELS ---------------------------//
var SkillsDmLayer = require('../../dbAdapters/dbManipulationLayers').skills;

var skills = {};

skills.getAllSkills = function(req, res) {
  return SkillsDmLayer.getAll()
    .then (function (skills) {
      return Success.successResponse(res, skills, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

skills.getSkill = function(req, res) {
  var params = req.params;
  var skillId = params.skill_id;

  if (!skillId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'skill_id' });
  }

  return SkillsDmLayer.findOneById(skillId)
    .then (function (skill) {
      if (!skill) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'skill_not_found' };
      }
      return Success.successResponse(res, skill, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

skills.createSkill = function(req, res) {
  var body = req.body;
  var name = body.name;
  if (!name) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'name' });
  }

  name = name.trim().toLowerCase();
  if (!name.length) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'name' });
  }

  return SkillsDmLayer.createSkill(name)
    .then (function (data) {
      if (!data) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_not_created' };
      }
      return Success.successResponse(res, data, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

module.exports = skills;
