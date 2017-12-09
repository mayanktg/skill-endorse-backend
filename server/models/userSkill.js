'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSkillSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CustomerUser' },
  endorser_user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CustomerUser' },
  skill_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Skill' },
  is_endorsed: { type: Boolean, default: true },

  created_at: { type: Date, default: new Date() }
});

UserSkillSchema.index({
    skill_id: 1,
    user_id: 1,
    endorser_user_id: 1
  }, { unique: true });

UserSkillSchema.index({
    user_id: 1,
    is_endorsed: 1
  });

module.exports = mongoose.model('UserSkill', UserSkillSchema);
