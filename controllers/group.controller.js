var Group = require('../models').Group;


/**
 * Gets all the groups
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.all = function(req, res) {
  Group.run().then(function(groups) {
    res.json(groups);
  }).error(function(err) {
    res.status(500).send('Group table does not exist');
  });
};

/**
 * Get a single group
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.getOne = function(req, res) {
  if(req.group) { 
    res.json(req.group);
  } 
};

/**
 * Create a new group
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.create = function(req, res) {
  req.body.name = req.body.groupName;
  delete req.body.groupName;
  
  var group = new Group(req.body);

  group.save().then(function(doc) {
    res.json(doc);
  }).error(function(err) {
    res.status(500).send(err);
  });
};

/**
 * Update a group's details
 * @param  {object} req http request
 * @param  {object} res http response
 */
exports.update = function(req, res) {
  var group = req.group;
  group = _.extend(group, req.body);

  group.save().then(function(doc) {
    res.json(doc);
  }).error(function(err) {
    res.status(500).send(err);
  });
};

/**
 * Delete a group
 * @param  {object} req http request
 * @param  {object} res http response 
 */
exports.delete = function(req, res) {
  var group = req.group;

  if(group.members.length) {
    var message = 'Group can only be deleted if it has no members';
    return res.status(400).send(message);
  }
  
  group.delete().then(function(result) {
    res.json(result);
  }).error(function(err) {
    res.status(500).send(err);
  });
};

/**
 * Validates group name entered in the group form to ensure
 * that the group doesn't already exist
 * @param  {object} req http request
 * @param  {object} res http response 
 */
exports.checkIfGroupNameAlreadyExists = function(req, res) {
  var groupName = req.body.groupName ? req.body.groupName.trim() : ''; 

  Group.filter(function(group) {
    var regex = '(?i)^' + groupName + '$';
    return group('name').match(regex);
  }).run(function(err, result) {
    if(err) {
      return res.json({error: 'Could not find group for name uniqueness'}); 
    }
    if(result.length) {
      return res.json({groupName: 'A group with this name already exists'});
    }
    res.json({});
  });
};

/**
 * Middleware that fetches a group through the id of that group
 * @param  {object}    req   http request
 * @param  {object}    res   http response 
 * @param  {function}  next  middleware that moves execution to the next function
 * @param  {string}    id    id of the group passed as a parameter in the url
 */
exports.groupById = function(req, res, next, id) { 
  Group.get(id).getJoin().run().then(function(doc) {
    req.group = doc;
    next();
  }).error(function() {
    res.status(500).send('Cannot find group');
  });
};