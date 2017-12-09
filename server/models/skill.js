'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
  name: { type: String, unique: true, required: true }
});

SkillSchema.index({ _id: 1 }, { unique: true });

module.exports = mongoose.model('Skill', SkillSchema);
