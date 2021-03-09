const dayjs = require('dayjs');
const { exec, escape } = require('../db/mysql');

function getAllArticles() {
  // TODO sql syntax error
  const sql = `
  select * from tb_blogs, tb_users
    where tb_blogs.author_id=tb_users.id
      and tb_blogs.deleted=0
    order by tb_blogs.create_time desc`;
  return exec(sql);
}

function addArticle(article) {
  // const { ...escaped } = article;
  // Object.entries(escaped).forEach((pair) => {
  //   escaped[pair.key] = escape(pair.value);
  // });
  // const sql = `
  // insert into tb_blogs
  //   (author_id, title, create_time, content)
  //   values (${+(escaped.author_id)}, ${escaped.title}, ${escaped.create_time}, ${escaped.content});`;
  const sql = `
  insert into tb_blogs
    (author_id, title, create_time, content)
    values (
      ${+(article.author_id)},
      ${escape(article.title)},
      ${dayjs(article.create_time).format('YYYYMMDDHHmmss')},
      ${escape(article.content)}
    );`;
  return exec(sql);
}

module.exports = {
  getAllArticles,
  addArticle,
};
