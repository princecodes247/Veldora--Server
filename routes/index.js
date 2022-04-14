const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>Who forms the forms...</p>');
});

module.exports = router;
