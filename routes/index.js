var users = require('../controllers/user.controller');
var groups = require('../controllers/group.controller');

module.exports = function(app) {

  app.route('/api/users')
     .get(users.all)
     .post(users.create);

  app.route('/api/users/:userId')
     .get(users.getOne)
     .put(users.update)
     .delete(users.delete);

  app.route('/api/groups')
     .get(groups.all)
     .post(groups.create);

  app.route('/api/groups/:groupId')
     .get(groups.getOne)
     .post(groups.update)
     .delete(groups.delete); 

  app.route('/api/validateGroupFields')
     .post(groups.checkIfGroupNameAlreadyExists);


  app.param('userId', users.userById);
  app.param('groupId', groups.groupById);
};
