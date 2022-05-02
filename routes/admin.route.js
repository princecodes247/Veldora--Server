const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth.middleware");

router.get("/getAllUsers", ensureAuthenticated, ensureAdmin, UserController.getAllUsers);
router.get("/getUser/:userID", ensureAuthenticated, ensureAdmin, UserController.getUser);
// router.get("/createUser", ensureAuthenticated, ensureAdmin, UserController.createUser);
router.get("/deleteUser/:userID", ensureAuthenticated, ensureAdmin, UserController.deleteUser);

module.exports = router;
