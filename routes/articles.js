const express = require('express');
const { getAllArticles, addArticle } = require('../controller/articles');

const router = express.Router();

router.get('/all', (req, res) => {
  // res.render('index', { title: 'Express' });
  getAllArticles()
    .then((rows) => {
      console.log(rows);
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
