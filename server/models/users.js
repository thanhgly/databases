var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('Connected successfully');
        db.query('SELECT * FROM users', (err, results) => {
          console.log('results in getAll', results);
          if (err) {
            //throw err;
            callback(err);
          } else {
            callback(null, results);
            db.end();
          }
        });
      }
    });

  },
  create: function (data, callback) {
    var username = data['username'];

    console.log('username in create', username);

    db.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('Connected successfully');
        const queryString = 'INSERT INTO users (name) values (?)';
        const queryArgs = [username];
        db.query(queryString, queryArgs, (err, results) => {
          console.log('results in Create', results);

          if (err) {
            //throw err;
            console.log('error in create', err);
            callback(err);
          } else {
            callback(null, results);
            db.end();
          }
        });
      }
    });
  }
};
