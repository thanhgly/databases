var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll(function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(JSON.stringify(data));
      }
    });
  },
  post: function (req, res) {
    models.users.create(req.body, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send("Post successful");
      }
    });
  }
};
