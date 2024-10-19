const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controller/auth.controller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// authenticate.next() -> getUser
router.get("/auth", authController.authenticate, userController.getUserById)

module.exports = router;
