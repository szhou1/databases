var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
exports.createDBConnection = function() {
  console.log('create connection');
  return mysql.createConnection({
    user: 'root',
    password: 'hr48',
    database: 'chat'
  });
  // return dbConnection;
};

//SELECT id FROM users WHERE users.name = 'valjean'