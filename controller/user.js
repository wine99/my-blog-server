const { exec, escape } = require('../db/mysql');

function checkLogin(username, password) {
  const sql = `
  select id, username from tb_users
    where tb_users.username=${escape(username)}
      and tb_users.password=${escape(password)}`;
  return exec(sql);
}

module.exports = {
  checkLogin,
};
