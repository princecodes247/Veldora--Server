const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");


router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getUser/:userID", UserController.getUser);
router.get("/createUser", UserController.createUser);
router.get("/deleteUser/:userID", UserController.deleteUser);

module.exports = router;
