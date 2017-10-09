var mysql = require('mysql');

var connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root',
  database:'media_app',
  multipleStatements: true
});

module.exports = connection;
