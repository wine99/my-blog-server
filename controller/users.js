const { exec, escape } = require('../db/mysql');

function checkLogin(username, password) {
  const sql = `
  select id, user_name from tb_users
    where tb_users.user_name=${escape(username)}
      and tb_users.password=${escape(password)}`;
  return exec(sql);
}

module.exports = {
  checkLogin,
};
