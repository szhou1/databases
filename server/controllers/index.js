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
      console.log('post message controller');
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log('post users controller!!!');
      console.log(models.messages.post);
      console.log(req.body);
      models.users.post(req.body);

      res.end();
    }
  }
};

