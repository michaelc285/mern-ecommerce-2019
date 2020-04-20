const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Model
const User = require("../models/Users");

// JWT properties
const EXPIRE = "1d";
const JWT_SECRET = config.get("jwtSecret");

/**
 * @desc   Login User
 * @route  /api/auth/login
 * @access Public
 * */
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //Check fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Empty field(s)",
    });
  }

  try {
    //Check existing
    const user = await User.findOne({ email });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid password");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: EXPIRE,
    });
    if (!token) throw Error("Couldnt sign the token");

    return res.status(200).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

/**
 * @desc   Register user
 * @route  Post /api/auth/register
 * @access Public
 */
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  //Check fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Empty field(s)",
    });
  }

  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: EXPIRE,
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
      return res.status(400).json({
        success: false,
        error: "Email already exsit",
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Something went wrong",
      });
    }
  }
};

/**
 * @desc   Get user
 * @route  Post /api/auth/user
 * @access Private
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User not found");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
