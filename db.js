var db = require('mysql-promise')();

var conf = {
  "host": process.env.DATABASE_HOST,
  "user": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASSWORD,
  "database": process.env.DATABASE
};

console.log ("connecting to ", conf);

db.configure(conf);

module.exports = db;
