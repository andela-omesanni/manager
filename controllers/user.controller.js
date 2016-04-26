var User = require('../models').User;
var Group = require('../models').Group;


/**
 * Gets all the users in database
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.all = function(req, res) {
  User.run().then(function(users) {
    res.json(users);
  }).error(function(err) {
    res.status(500).send('User table does not exist');
  });
};

/**
 * Get a single user
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.getOne = function(req, res) {
  if(req.user) { 
    res.json(req.user);
  } 
};

function checkIfGroupExists(id, cb) {
  Group.filter({id: id}).run(function(err, result) {
    if(!err && !result.length) {
      err = 'Group does not exit';
    }
    cb(err);
  });
}

/**
 * Create a new user
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.create = function(req, res) {
  checkIfGroupExists(req.body.groupSelect, function(err) {
    if(err) {
      return res.status(500).send(err);
    }

    req.body.name = req.body.userName;
    var id = req.body.groupSelect;
    
    delete req.body.userName;
    delete req.body.groupSelect;
    
    var user = new User(req.body);
    user.groups = [id];

    user.saveAll().then(function(doc) {
      res.json(doc);
    }).error(function(err) {
      res.status(500).send('Error occurred');
    });
  });
};

/**
 * Update a user's details
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.update = function(req, res) {
  var user = req.user;
  
  if(req.body.groupId) {
    if(req.body.action == 'addToGroup') {
      user.groups.push(req.body.groupId);
    } 
    else {
      var index = user.groups.findIndex(function(group) {
        return group.id === req.body.groupId;
      });
      user.groups.splice(index, 1);
    }
  }
  else {
    user = _.extend(user, req.body);
  }

  user.saveAll().then(function(doc) {
    res.json(doc); 
  }).error(function(err) {
    res.status(500).send('Could not update details');
  });
};

/**
 * Delete a user
 * @param  {object} req http request
 * @param  {object} res http response 
 */
exports.delete = function(req, res) {
  var user = req.user;
  
  user.delete().then(function(result) {
    res.json(result);
  }).error(function(err) {
    res.status(500).send(err);
  });
};

exports.addUserToGroup = function(req, res) {
  var user = req.user;
  user.groups.push(req.group.id);

  user.saveAll().then(function(doc) {
    res.json(doc);
  }).error(function(err) {
    res.status(500).send('Could not add user to group');
  });
};

/**
 * Middleware that fetches a user through the id of that user
 * @param  {object}    req   http request
 * @param  {object}    res   http response 
 * @param  {function}  next  middleware that moves execution to the next function
 * @param  {sting}     id    id of the user passed as a parameter in the url
 */
exports.userById = function(req, res, next, id) { 
  User.get(id).getJoin().run().then(function(doc) {
    req.user = doc;
    next();
  }).error(function() {
    return res.status(500).send('Cannot find user');
  });
};