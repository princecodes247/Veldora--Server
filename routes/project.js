const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:projectID', function(req, res, next) {
  let projectID = req.params.projectID;
});

module.exports = router;
