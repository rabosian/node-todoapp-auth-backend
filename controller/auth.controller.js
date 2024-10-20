const authController = {};
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error(`tokenString: ${tokenString} is invalid`);
    }
    token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        throw new Error("Invalid token");
      }
      req.userId = payload._id;
    });
    next();
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

module.exports = authController;
