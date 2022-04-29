const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");

router.get("/getAllUsers", ensureAuthenticated, UserController.getAllUsers);
router.get("/getUser/:userID", ensureAuthenticated, UserController.getUser);
router.get("/createUser", ensureAuthenticated, UserController.createUser);
router.get("/deleteUser/:userID", ensureAuthenticated, UserController.deleteUser);

module.exports = router;
