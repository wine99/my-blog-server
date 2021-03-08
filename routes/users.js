const express = require('express');
const { checkLogin } = require('../controller/users');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  checkLogin(username, password)
    .then((rows) => {
      if (rows) res.json(rows[0]);
      else res.json(null);
    })
    .catch((err) => {
      res.json(null);
      console.error(err);
    });
});

module.exports = router;
