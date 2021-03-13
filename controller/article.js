const dayjs = require('dayjs');
const { exec, escape } = require('../db/mysql');

function getAllArticles() {
  const sql = `
  select *, article.id as id from article, user
    where article.author_id=user.id
      and article.deleted=0
    order by article.create_time desc`;
  return exec(sql);
}

function getArticleById(id) {
  const sql = `
  select *, article.id as id from article, user
    where article.id=${id}
      and article.author_id=user.id
      and article.deleted=0
    order by article.create_time desc`;
  return exec(sql);
}

function addArticle(article) {
  // const { ...escaped } = article;
  // Object.entries(escaped).forEach((pair) => {
  //   escaped[pair.key] = escape(pair.value);
  // });
  // const sql = `
  // insert into article
  //   (author_id, title, create_time, content)
  //   values (${
  //     +(escaped.author_id)},
  //     ${escaped.title},
  //     ${escaped.create_time},
  //     ${escaped.content});`;
  const sql = `
  insert into article
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
  getArticleById,
};
