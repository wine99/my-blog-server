const { exec, escape } = require('../db/mysql');

function checkLogin(username, password) {
  const sql = `
  select id, username from user
    where user.username=${escape(username)}
      and user.password=${escape(password)}`;
  return exec(sql);
}

module.exports = {
  checkLogin,
};
