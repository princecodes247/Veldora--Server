const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
router.post('/signup', AuthController.signUp);
router.post('/signout', AuthController.signOut);

module.exports = router;