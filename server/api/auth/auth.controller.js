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
var CustomerUserDmLayer = require('../../dbAdapters/dbManipulationLayers').customerUser;

var auth = {};

auth.login = function(req, res) {
  var body = req.body;
  console.log(body);
  var userId = body.user_id;
  var password = body.password;

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'user_id' });
  }

  if (!password) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'password' });
  }

  return CustomerUserDmLayer.loginByUserId(userId, password)
    .then (function (user) {
      if (!user) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_not_found' };
      }
      return Success.successResponse(res, user, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

auth.getUser = function(req, res) {
  var params = req.params;
  var userId = params.user_id;

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'userId' });
  }

  return CustomerUserDmLayer.getUserByUserId(userId)
    .then (function (user) {
      if (!user) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_not_found' };
      }
      return Success.successResponse(res, user, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

auth.createUser = function(req, res) {
  var body = req.body;
  var userId = body.user_id;
  var email = body.email;
  var password = body.password;
  var name = body.name;
  var photo = body.photo;
  var skills = body.skills;

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'user_id' });
  }

  if (!password) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'password' });
  }

  if (!email) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'email' });
  }

  if (!name) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'name' });
  }

  return CustomerUserDmLayer.createUser(userId, name, email, password, photo, skills)
    .then (function (user) {
      console.log(user);
      if (!user) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_not_created' };
      }
      return Success.successResponse(res, user, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

auth.updateUser = function(req, res) {
  var params = req.params;
  var body = req.body;
  var userId = params.user_id;
  var name = body.name;
  var photo = body.photo;
  var skills = body.skills;

  if (!userId) {
    return Success.handleError(res, { 'code': ErrorCodes.dbNotFound , field: 'user_id' });
  }

  var updateObj = {};
  if (name) updateObj.name = name;
  if (photo) updateObj.photo = photo;
  if (skills) updateObj.skills = skills;

  return CustomerUserDmLayer.updateUser(userId, updateObj)
    .then (function (user) {
      console.log(user);
      if (!user) {
        throw { 'code': ErrorCodes.dbNotFound , field: 'user_not_created' };
      }
      return Success.successResponse(res, user, 200);
    })
    .catch(function (err) {
      return Success.handleError(res, err);
    });
};

module.exports = auth;
