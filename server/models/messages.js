var db = require('../db');
//var dbConnection = require('../db/index.js');

module.exports = {

  getAll: function (callback) {
    db.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('Connected successfully');
        db.query('SELECT * FROM messages', (err, results) => {
          console.log('results', results);
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

  }, // a function which produces all the messages
  create: function (data, callback) {
    var {username, message, roomname} = data;
    db.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('Connected successfully');
        //INSERT INTO orders ( id,userid, timestamp)
        //SELECT o.userid , o.timestamp FROM users u INNER JOIN orders o ON  o.userid = u.id
        // https://stackoverflow.com/questions/44469503/sql-insert-into-with-inner-join
        const queryString = 'INSERT INTO messages (user, messageText, roomname) SELECT u.id, ?, ? FROM users u WHERE u.name = ?';
        const queryArgs = [message, roomname, username];
        db.query(queryString, queryArgs, (err, results) => {
          console.log('results', results);

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
  } // a function which can be used to insert a message into the database
};
