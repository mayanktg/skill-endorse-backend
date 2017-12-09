'use strict';

var DbaCustomerUser = require('../../dbAccessLayers').customerUser;
var ErrorCode = require('../../../error').errorCodes;
var async = require('async');
var _ = require('lodash');
var crypto = require('crypto');

var customerUserDmLayer = {};

customerUserDmLayer.loginByUserId = function(userId, password) {
  var hashedPass = crypto.createHash('md5').update(password).digest('hex');
  var query = { user_id: userId, pass_salt: hashedPass };
  var requiredFields = 'name email user_id photo skills';
  return DbaCustomerUser.findOne(query, requiredFields);
}

customerUserDmLayer.getUserByUserId = function(userId) {
  var query = { user_id: userId };
  var requiredFields = 'name email user_id photo skills';
  return DbaCustomerUser.findOne(query, requiredFields);
}

customerUserDmLayer.createUser = function(userId, name, email, password, photo, skills) {
  var hashedPass = crypto.createHash('md5').update(password).digest('hex');

  var query = {
    user_id: userId,
    name: name,
    email: email,
    pass_salt: hashedPass
  };

  if (photo) query.photo = photo;
  if (skills) query.skills = skills;

  return DbaCustomerUser.create(query);
}

customerUserDmLayer.updateUser = function(userId, updateObj) {
  var query = { user_id: userId };
  var updateQuery = { '$set': updateObj };
  var options = { multi: false };
  console.log(query, updateObj, options);
  return DbaCustomerUser.update(query, updateObj, options);
}

module.exports = customerUserDmLayer;
