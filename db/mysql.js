require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  database: process.env.DB_MYSQL_DB,
  host: process.env.DB_MYSQL_HOST,
  port: process.env.DB_MYSQL_PORT,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASS,
});

function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape,
};
