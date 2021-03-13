const express = require('express');
const {
  getAllArticles,
  getArticleById,
  addArticle,
} = require('../controller/article');

const {
  SuccessModel,
  ErrorModel,
} = require('../model/resModel');

const router = express.Router();

router.get('/all', (req, res) => {
  // res.render('index', { title: 'Express' });
  getAllArticles()
    .then((rows) => {
      if (rows.length) {
        res.json(new SuccessModel(rows.map(((article) => {
          const { ...noPassword } = article;
          delete noPassword.password;
          return noPassword;
        }))));
      } else {
        res.json(new ErrorModel('当前暂无文章'));
      }
    })
    .catch((err) => {
      res.json(new ErrorModel('未知错误'));
      console.error(err);
    });
});

router.get('/:id', (req, res) => {
  getArticleById(req.params.id)
    .then((rows) => {
      if (rows.length) {
        const { ...noPassword } = rows[0];
        delete noPassword.password;
        res.json(new SuccessModel(noPassword));
      } else {
        res.json(new ErrorModel('文章不存在'));
        console.error(rows);
      }
    })
    .catch((err) => {
      res.json(new ErrorModel('未知错误'));
      console.error(err);
    });
});

router.post('/new', (req, res) => {
  addArticle(req.body)
    .then((insertResult) => {
      if (insertResult.insertId) {
        res.json(new SuccessModel({
          newArticleId: insertResult.insertId,
        }, '发布成功'));
      } else {
        res.json(new ErrorModel('发布失败，未知错误'));
        console.error(insertResult);
      }
    })
    .catch((err) => {
      res.json(new ErrorModel('发布失败，未知错误'));
      console.error(err);
    });
});

module.exports = router;
