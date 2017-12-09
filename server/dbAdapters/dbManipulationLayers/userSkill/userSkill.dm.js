'use strict';

var DbaUserSkill = require('../../dbAccessLayers').userSkill;

var userSkillsDmLayer = {};

userSkillsDmLayer.createUserSkill = function(skillId, userId, endorserId) {
 var query = {
    skill_id: skillId,
    user_id: userId,
    endorser_user_id: endorserId,
    is_endorsed: true
  };
  return DbaUserSkill.create(query);
}

userSkillsDmLayer.findByUserId = function(userId) {
 var query = { user_id: userId, is_endorsed: true };
 var requiredFields = 'endorser_user_id skill_id';
  return DbaUserSkill.find(query, requiredFields);
}

userSkillsDmLayer.updateEndorse = function(skillId, userId, endorserId, isEndorsed) {
  var query = { user_id: userId, skill_id: skillId, endorser_user_id: endorserId };
  var updateQuery = { '$set': { is_endorsed: isEndorsed } };
  var options = { multi: false };
  return DbaUserSkill.update(query, updateQuery, options);
}

module.exports = userSkillsDmLayer;
