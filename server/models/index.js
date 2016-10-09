// var db = require('../db');
var Promise = require('bluebird');
var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', 'hr48', {
  define: {
    timestamps: false
  }
});

var User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

var Room = db.define('Room', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

var Message = db.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  text: Sequelize.STRING
});

User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

module.exports = {
  messages: {
    get: function (obj, callback) {
      console.log('get messages in model');
      Message.sync()
        .then(function() {
          return Message.findAll({ include: [
                    {model: User}, 
                    {model: Room}
          ]});
        })
        .then(function(messages) {
          callback(JSON.stringify(messages));
        })
        .catch(function(err) {
          console.error(err);
          // db.close();
        });
    },

    post: function (obj) {
      console.log(obj);
      var insertMessage = function(obj) {
        return new Promise(function(resolve, reject) {      
          module.exports.users.post(obj.username, function(user) {
            console.log('userid', user.id);
            resolve({obj: obj, userId: user.id});
          });
        });
      };

      insertMessage(obj).then(function(o) {
        return new Promise( function(resolve, reject) {
          console.log('after resolve', o);
          module.exports.rooms.post(o.obj.roomname, function(room) {
            console.log('roomId', room.id);
            o['roomId'] = room.id;
            resolve(o);
          });
        });
      })
      .then(function(o) {
        console.log(o);
        return new Promise( function(resolve, reject) {
          Message.create({text: o.obj.text, UserId: o.userId, RoomId: o.roomId})
            .then(function(msg, created) {
              console.log(msg);
              console.log(created);
              
            });
            // .success(function(msg, created) {
            // });
          // console.log(msg);
        });

      });

      // insertMessage(obj);
    }
  },

  users: {

    get: function (obj, callback) {
      User.sync()
        .then(function() {
          return User.findAll({});
        })
        .then(function(users) {
          callback(JSON.stringify(users));
          // db.close();
        })
        .catch(function(err) {
          console.error(err);
          // db.close();
        });
    },

    post: function (obj, callback) {
      console.log('post users model', obj);

      User.findOrCreate({ where: { name: obj }, defaults: { name: obj}})
        .spread(function(user, created) {
          console.log(user.get({ plain: true}));
          console.log(created);
          callback(user.get({plain: true}));
        });
    }
  },

  rooms: {

    get: function (obj, callback) {
      Room.sync()
        .then(function() {
          return Room.findAll({});
        })
        .then(function(rooms) {
          callback(JSON.stringify(rooms));
        })
        .catch(function(err) {
          console.error(err);
          // db.close();
        });
    },

    post: function (obj, callback) {
      console.log('post rooms model', obj);

      Room.findOrCreate({ where: { name: obj }})
        .spread(function(room, created) {
          console.log(room.get({ plain: true}));
          console.log('created?', created);
          callback(room.get({ plain: true}));
        });
    }
    
  }

};

