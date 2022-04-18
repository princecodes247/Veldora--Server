const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller")

/* GET home page. */
router.get('/getAllUsers', UserController.getAllUsers);

module.exports = router;
