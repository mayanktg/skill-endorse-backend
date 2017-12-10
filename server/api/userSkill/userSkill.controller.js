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
var UserSkillDmLayer = require('../../dbAdapters/dbManipulationLayers').userSkill;

var userSkill = {};

userSkill.getSkillByUserId = function(req, res) {
  var params = req.params;
  var userId = params.user_id;

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'user_id' });
  }

  return UserSkillDmLayer.findByUserId(userId)
    .then (function (skills) {
      if (!skills) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'skills_not_found' };
      }
      const skillsMerged = {};
      skills.map(function(skill) {
        if (!skillsMerged[skill.skill_id.name]) skillsMerged[skill.skill_id.name] = [];
        skillsMerged[skill.skill_id.name].push({
          skill_id: skill.skill_id._id,
          user_id: skill.endorser_user_id.user_id,
          name: skill.endorser_user_id.name,
          photo: skill.endorser_user_id.photo
        });
      })
      return Success.successResponse(res, skillsMerged, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

userSkill.createUserSkill = function(req, res) {
  var body = req.body;
  var userId = body.user_id;
  var endorserId = body.endorser_user_id;
  var skillId = body.skill_id;

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'user_id' });
  }

  if (!endorserId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'endorser_user_id' });
  }

  if (!skillId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'skill_id' });
  }

  return UserSkillDmLayer.createUserSkill(skillId, userId, endorserId)
    .then (function (data) {
      if (!data) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_skill_not_created' };
      }
      return Success.successResponse(res, data, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

userSkill.updateEndorseStatus = function(req, res) {
  var body = req.body;
  var userId = body.user_id;
  var endorserId = body.endorser_user_id;
  var skillId = body.skill_id;
  var isEndorsed = body.is_endorsed;
  if (isEndorsed === 'true' || isEndorsed === true) {
    isEndorsed = true;
  } else {
    isEndorsed = false;
  }

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'user_id' });
  }

  if (!endorserId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'endorser_user_id' });
  }

  if (!skillId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'skill_id' });
  }

  return UserSkillDmLayer.updateEndorse(skillId, userId, endorserId, isEndorsed)
    .then (function (data) {
      if (!data) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_skill_not_updated' };
      }
      return Success.successResponse(res, data, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

module.exports = userSkill;
