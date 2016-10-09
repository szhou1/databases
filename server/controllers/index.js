var models = require('../models');


module.exports = {
  messages: {
    get: function (req, res) {
      console.log('get message in controller');
      models.messages.get(req.body, function(body) {
        res.end(body);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('post message controller', req.body);
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('get users in controller');
      models.users.get(req.body, function(body) {
        res.end(body);
      });
    },
    post: function (req, res) {
      console.log('post users controller!!!');
      console.log(models.messages.post);
      console.log(req.body);
      models.users.post(req.body);

      res.end();
    }
  },

  rooms: {
    get: function (req, res) {
      console.log('get rooms in controller');
      models.rooms.get(req.body, function(body) {
        res.end(body);
      });
    },
    post: function (req, res) {
      console.log('post rooms in controller');
      models.rooms.post(req.body);
      res.end();
    }
  }
};

