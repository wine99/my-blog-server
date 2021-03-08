const express = require('express');
const { getAllArticles } = require('../controller/articles');

const router = express.Router();

router.get('/all', (req, res, next) => {
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

module.exports = router;
