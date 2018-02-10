var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth')
var fb = require('../middleware/facebook')
/* GET users listing. */
router.get('/', fb , auth.signin);

module.exports = router;
