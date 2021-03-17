/* eslint-disable camelcase */

const dayjs = require('dayjs');
const { exec, escape } = require('../db/mysql');

function getAllArticles() {
  const sql = `
  select *, article.id as id from article, user
    where article.author_id=user.id
      and article.deleted=0
    order by article.created_at desc`;
  return exec(sql);
}

function getArticleById(id) {
  const sql = `
  select *, article.id as id from article, user
    where article.id=${id}
      and article.author_id=user.id
      and article.deleted=0
    order by article.created_at desc`;
  return exec(sql);
}

function addArticle({
  author_id, title, created_at, updated_at, content, content_markdown,
}) {
  // const { ...escaped } = article;
  // Object.entries(escaped).forEach((pair) => {
  //   escaped[pair.key] = escape(pair.value);
  // });
  // const sql = `
  // insert into article
  //   (author_id, title, created_at, content)
  //   values (${
  //     +(escaped.author_id)},
  //     ${escaped.title},
  //     ${escaped.created_at},
  //     ${escaped.content});`;
  const sql = `
  insert into article
    (author_id, title, created_at, updated_at, content, content_markdown)
    values (
      ${+(author_id)},
      ${escape(title)},
      ${dayjs(created_at).format('YYYYMMDDHHmmss')},
      ${dayjs(updated_at).format('YYYYMMDDHHmmss')},
      ${escape(content)},
      ${escape(content_markdown)}
    );`;
  return exec(sql);
}

function editArticle({
  id, author_id, title, updated_at, content, content_markdown,
}) {
  const sql = `
  update article set
    author_id=${+(author_id)},
    title=${escape(title)},
    updated_at=${dayjs(updated_at).format('YYYYMMDDHHmmss')},
    content=${escape(content)},
    content_markdown=${escape(content_markdown)}
    where id=${+id}`;
  return exec(sql);
}

function deleteArticle(id) {
  const sql = `update article set deleted=1 where id=${+id}`;
  return exec(sql);
}

module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
  editArticle,
  deleteArticle,
};
