const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>Who forms the forms...</p>');
});

router.post('/waitlist', function(req, res, next) {
  
});

// Temporary route to test email functionality
// const sendEmail = require('../utils/sendEmail')
// router.get('/sendEmail', function(req, res, next) {
//   sendEmail('princecodes247@gmail.com', 'Hello', 'Hello World')
//   res.send('sent!!!');
// });

module.exports = router;
