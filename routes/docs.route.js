const express = require('express');
const router = express.Router();

/* GET docs page. */
router.get('/', function(req, res, next) {
  res.send('<p>Who docs the docs...</p>');
});

module.exports = router;
