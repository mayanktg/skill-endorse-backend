"use strict";

var Promise = require('bluebird');
//Models
var models = require('../../../models');
var CustomerUser = models.customerUser;

//Promises
Promise.promisifyAll(CustomerUser);

var customerUser = {};

customerUser.findOne = function(query, requiredKeys) {
  return CustomerUser.findOne(query, requiredKeys)
    .populate('skills');
}

customerUser.create = function(query) {
  return CustomerUser.createAsync(query);
}

customerUser.update = function(query, updateQuery, options) {
  return CustomerUser.updateAsync(query, updateQuery, options);
}

module.exports = customerUser;

