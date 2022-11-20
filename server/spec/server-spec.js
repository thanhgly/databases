/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('Connected successfully');
      }
    });

    const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean22';
    const text = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, text, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */

        const queryString = 'SELECT MAX(m.id), u.username, m.text, m.roomname FROM messages m INNER JOIN users u ON (u.id = m.UserId) WHERE u.username = ? AND m.text = ? AND m.roomname = ?';

        const queryArgs = [username, text, roomname];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          //console.log('results in first test', results);
          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.

          expect(results[0].text).toEqual(text);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db

    const username = 'Valjean22';
    const text = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';

    const queryString = 'INSERT INTO messages (UserId, text, roomname) SELECT u.id, ?, ? FROM users u WHERE u.username = ?';
    const queryArgs = [text, roomname, username];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[0].text).toEqual(text);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  it('Should output all users from the DB', (done) => {
    //dbConnection.query(`truncate messages`, done);


    const username1 = 'User1';

    const username2 = 'User2';

    axios.post(`${API_URL}/users`, { username: username1 })
      .then(() => {
        axios.post(`${API_URL}/users`, { username: username2 });
      })
      .then(() => {
        axios.get(`${API_URL}/users`)
          .then((response) => {
            const userLog = response.data;
            expect(userLog[userLog.length - 3].username).toEqual('Valjean22');

            expect(userLog[userLog.length - 2].username).toEqual(username1);

            expect(userLog[userLog.length - 1].username).toEqual(username2);


            done();
          })
          .catch((err) => {
            throw err;
          });

      });

    // Let's insert a message into the db
  });

  // it('should throw an error with wrong request endpoint', (done) => {
  //   axios.get(`${API_URL}/afgdsga`)
  //     .then((response) => {
  //     })
  //     .catch((err) => {
  //       expect(err).toBeTruthy();
  //       done();
  //     });
  // });

  // it('should not found a message that has been delete from the DB', (done) => {

  //   const username = 'Tester';
  //   const text = 'Just a test.';
  //   const roomname = 'Test';
  //   axios.post(`${API_URL}/users`, { username })
  //     .then(() => {

  //       return axios.post(`${API_URL}/messages`, { username, text, roomname });
  //     })
  //     .then(() => {
  //       const queryString = 'DELETE FROM messages m WHERE m.text = ?';

  //       const queryArgs = [text];

  //       dbConnection.query(queryString, queryArgs, (err, results) => {
  //         if (err) {
  //           throw err;
  //         }


  //       });
  //     })
  //     .then(() => {
  //       axios.get(`${API_URL}/messages`)
  //         .then((response) => {
  //           const messageLog = response.data;
  //           expect(messageLog[messageLog.length - 1].text).not.toEqual(text);
  //           done();
  //         })
  //         .catch((err) => {
  //           throw err;
  //         });
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // });

});

