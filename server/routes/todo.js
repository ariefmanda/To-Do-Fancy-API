var express = require('express');
var router = express.Router();
var todo = require('../controllers/todo')
var authentication = require('../middleware/authentication')
var authorization = require('../middleware/authorization')
/* GET users listing. */
router.get('/', authorization, todo.find);
router.post('/', authorization, todo.create);
router.put('/:id', authorization, todo.updateCeklist);
router.delete('/:id', authorization, todo.destroy);

module.exports = router;
