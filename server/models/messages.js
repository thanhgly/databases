var db = require('../db');
//var dbConnection = require('../db/index.js');

module.exports = {

  getAll: function (callback) {
    db.connect();
    // db.connect((err) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     console.log('Connected successfully');
    db.query('SELECT m.id, u.username, m.text, m.roomname FROM messages m INNER JOIN users u ON (u.id = m.user)', (err, results) => {
      //console.log('results in mesages for getAll', results);
      if (err) {
        //throw err;
        callback(err);
      } else {
        callback(null, results);
        // db.end();
      }
    });


  }, // a function which produces all the messages
  create: function (data, callback) {
    console.log('data in create', data);
    var {username, text, roomname} = data;
    db.connect();
    // db.connect((err) => {
    //   if (err) {
    //     throw err;
    //   } else {
    // console.log('Connected successfully');
    //INSERT INTO orders ( id,userid, timestamp)
    //SELECT o.userid , o.timestamp FROM users u INNER JOIN orders o ON  o.userid = u.id
    // https://stackoverflow.com/questions/44469503/sql-insert-into-with-inner-join
    const queryString = 'INSERT INTO messages (user, text, roomname) SELECT u.id, ?, ? FROM users u WHERE u.username = ?';
    const queryArgs = [text, roomname, username];
    console.log('queryArgs', queryArgs);
    db.query(queryString, queryArgs, (err, results) => {
      console.log('results in mesages for create', results);

      if (err) {
        //throw err;
        callback(err);
      } else {
        callback(null, results);
        // db.end();
      }
    });

    // });
  } // a function which can be used to insert a message into the database
};
