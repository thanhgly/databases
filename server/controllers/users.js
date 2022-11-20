var models = require('../models');
var User = require('../db/index.js').User;

module.exports = {
  get: function (req, res) {
    User.findAll()
      .then(function(results) {
        res.send(results);
      })
      .catch(function(err) {
        throw new Error(err);
      });
  },
  post: function (req, res) {
    User.create({username: req.body['username']})
      .then(function(results) {
        res.sendStatus(201);
      })
      .catch(function(err) {
        console.log(err);
      });

  }
};
