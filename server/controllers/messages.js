var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll(function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(req.body, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send("Post successful");
      }
    });
  } // a function which handles posting a message to the database
};
