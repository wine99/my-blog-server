const express = require('express');
const { checkLogin } = require('../controller/user');

const {
  SuccessModel,
  ErrorModel,
} = require('../model/resModel');

const router = express.Router();

router.post('/login', (req, res) => {
  const {
    username,
    password,
  } = req.body;
  checkLogin(username, password)
    .then((rows) => {
      if (rows.length) res.json(new SuccessModel(rows[0], '登录成功'));
      else res.json(new ErrorModel('用户不存在或密码错误'));
    })
    .catch((err) => {
      res.json(new ErrorModel('未知错误'));
      console.error(err);
    });
});

module.exports = router;
