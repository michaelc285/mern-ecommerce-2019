const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

// @desc Get all user
// @route /api/v1/user
// @access Public
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: user,
    });
  }
};

// @desc Add user
// @route Post /api/v1/users
// @access Public
exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Empty field(s)",
      });
    }

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: "10d",
    });

    return res.status(201).json({
      success: true,
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    if (err.name === "MongoError") {
      const messages = "Email already exsit";

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: "Something went wrong",
      });
    }
  }
};

// @desc Delete user
// @route DELETE /api/v1/user:id
// @access Public
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
