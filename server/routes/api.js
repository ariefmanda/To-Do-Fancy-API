var express = require('express');
var router = express.Router();
var todo = require('./todo')
var auth = require('./auth')
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/todo', todo)
router.use('/auth', auth)

module.exports = router;
