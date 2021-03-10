const express = require('express');
const {
  getAllArticles,
  getArticleById,
  addArticle,
} = require('../controller/article');

const router = express.Router();

router.get('/all', (req, res) => {
  // res.render('index', { title: 'Express' });
  getAllArticles()
    .then((rows) => {
      res.json(rows.map(((article) => {
        const { ...noPassword } = article;
        delete noPassword.password;
        return noPassword;
      })));
    })
    .catch((err) => {
      res.json([]);
      console.error(err);
    });
});

router.get('/:id', (req, res) => {
  getArticleById(req.params.id)
    .then((rows) => {
      if (!rows[0]) {
        console.error(rows);
        res.json(null);
      } else {
        const { ...noPassword } = rows[0];
        delete noPassword.password;
        res.json(noPassword);
      }
    })
    .catch((err) => {
      console.error(err);
      res.json(null);
    });
});

router.post('/new', (req, res) => {
  addArticle(req.body)
    .then((insertResult) => {
      if (insertResult.insertId) {
        res.send({ newArticleId: insertResult.insertId });
      } else {
        res.send({ newArticleId: -1 });
        console.error(insertResult);
      }
    })
    .catch((err) => {
      res.send({ newArticleId: -1 });
      console.error(err);
    });
});

module.exports = router;
