var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({
    message: "selamat datang di todo"
  })
});

module.exports = router;
