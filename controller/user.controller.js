const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.signup = async (req, res) => {
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
    res.status(200).json({ status: "Success" });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = user.generateToken();
        return res.status(200).json({ status: "Success", user, token });
      }
    }
    throw new Error("email and password not match");
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

userController.getUserById = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user)
      res.status(404).json({ status: "Failed", error: "user NOT found" });
    res.status(200).json({ status: "Success", user });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

module.exports = userController;
