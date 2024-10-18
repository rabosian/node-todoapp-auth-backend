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
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: "failed", error: err.message });
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-__v -createdAt -updatedAt");
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = user.generateToken();
        return res.status(200).json({ message: "success", user, token });
      }
    }
    throw new Error("email and password don't match");
  } catch (err) {
    res.status(400).json({ message: "failed", error: err.message });
  }
};

module.exports = userController;
