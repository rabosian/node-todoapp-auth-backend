const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // user already exist
    const user = await User.findOne({ email });
    if (user) {
      throw new Error(`user already exists with ${email}`);
    }

    // hash
    if (!password || password.trim() === "")
      throw new Error("password is required and cannot be empty");

    const hashedPw = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, password: hashedPw });

    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "failed", error: err.message });
  }
};



module.exports = userController;
