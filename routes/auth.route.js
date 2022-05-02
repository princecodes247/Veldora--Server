const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.post('/signup', AuthController.signUp);
router.post('/signout', AuthController.signOut);

module.exports = router;