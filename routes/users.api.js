const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();
const User = require("../models/user")

router.post("/signup", userController.createUser);
router.post("/login");

router.post("/signup/test", async () => {
  const user = new User({
    name: "jaey",
    email: "argh",
    password: ""
  });
  try {
    await user.validate()
  }catch(err) {
    console.log(err)
  }
});

module.exports = router;
