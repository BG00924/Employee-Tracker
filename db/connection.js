const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Brownie1!',
    database: 'employees'
  });

  connection.connect(err => {
      if (err) throw err;
      console.log('Connection successful')
  })

  module.exports = connection;