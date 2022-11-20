var models = require('../models');
var Message = require('../db').Message;
var User = require('../db').User;


module.exports = {
  get: function (req, res) {
    Message.findAll({ include: [User]})
      .then(function(results) {
        res.send(results);
      })
      .catch(function(err) {
        throw new Error(err);
      });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    User.findOrCreate({
      where: {username: req.body['username']}
    }).then(function([user, created]) {
      var params = {
        text: req.body['text'],
        UserId: user.id,
        roomname: req.body['roomname']
      };
      Message.create(params)
        .then(function(results) {
          res.sendStatus(201);
        })
        .catch(function(err) {
          throw new Error(err);
        });
    })
      .catch(function(err) {
        throw new Error(err);
      });

  } // a function which handles posting a message to the database
};
