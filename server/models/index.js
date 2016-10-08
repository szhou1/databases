var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (obj) {
      console.log('post message model', obj);
      var conn = db.createDBConnection();
      // get user id
      var selectUserIdSql = 'SELECT id FROM users WHERE name=?';
      console.log(selectUserIdSql);
      conn.query(selectUserIdSql, obj.username, function(err, res) {
        if (err) {
          console.error(err);
        }
        var userId = res[0].id;
        console.log('userId', userId);
        // have valid user id, find room id
        var selectRoomIdSql = 'SELECT id FROM rooms WHERE name=?';
        console.log(selectRoomIdSql);
        conn.query(selectRoomIdSql, obj.roomname, function(err, res) {
          console.log('response from select id from rooms', res);

          if (err) {
            console.error(err);
          }
          if (res.length === 0) {
            // create new entry to rooms
            var sql = 'INSERT INTO rooms (name) VALUES (?)';
            console.log(sql);

            conn.query(sql, obj.roomname, function(err, res) {
              if (err) {
                console.error(err);
              }
              console.log('last room insert id: ', res.insertId);

              // insert the new message

            });
          } else {
            // room id exists, insert new message
            console.log('roomId', res[0].id);
            var roomId = res[0].id;
            console.log('room exists, insert new message, userId', userId, 'roomId', roomId, 'text', obj.message);

            var insertMessageSql = 'INSERT INTO messages (userId, roomId, text) VALUES (?, ?, ?)';
            console.log(insertMessageSql);
            conn.query(insertMessageSql, 
                      [ userId, 
                      roomId, 
                      obj.message ], 
                      // Date.now().toLocaleString() ], 
                      function(err, res) {
                        if (err) {
                          console.error(err);
                        }
                        console.log('INSERTED A NEW MESSAGE!', res.insertId);
                      }
            );
          }

        });

      });
      // console.log('userId', userId);
      // check if room exists

      //
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (obj) {
      console.log('post users model');
      var sql = 'INSERT INTO users (name) VALUES (?)';
      console.log(sql);
      db.createDBConnection().query(sql, obj.username, function(err, res) {
        if (err) {
          console.log(err); 
        }
        console.log('last insert id:', res.insertId);
      });
    }
  }
};

