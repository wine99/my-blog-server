const { exec, escape } = require('../db/mysql');

function getAllArticles() {
  const sql = `
  select * from tb_blogs, tb_users
    where tb_blogs.author_id=tb_users.id
      and tb_blogs.deleted=0
    order by tb_blogs.create_time desc`;
  return exec(sql);
}

module.exports = {
  getAllArticles,
};
