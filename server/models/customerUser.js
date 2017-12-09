'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerUserSchema = new Schema({
  user_id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  pass_salt: { type: String, required: true },
  photo: { type: String },
  skills: [ { type: mongoose.Schema.Types.ObjectId, ref: 'UserSkill'} ]
});

module.exports = mongoose.model('CustomerUser', CustomerUserSchema);
