const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller")

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:projectID', UserController.getUser);
// router.get('/createUser',   UserController.createUser);
// router.get('/deleteUser',   UserController.deleteUser);

module.exports = router;
