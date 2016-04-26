var thinky = require('../thinky');


var User = thinky.createModel('User', {
  id: String,
  name: thinky.type.string().required()
});

var Group = thinky.createModel('Group', {
  id: String,
  name: thinky.type.string().required()
});

User.hasAndBelongsToMany(Group, 'groups', 'id', 'id');
Group.hasAndBelongsToMany(User, 'members', 'id', 'id');

exports.User = User;
exports.Group = Group;