const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./token.js");
const {
  MISSING_NAME,
  MISSING_EMAIL,
  MISSING_PASSWORD,
  EMAIL_EXIST,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
  TOKEN_NOT_MATCH,
  TOKEN_NOT_FOUND,
} = require("../constant/types.js");
const REFRESH_TOKEN_COOKIE_PATH = require("../constant/path.js");
const REFRESH_JWT_SECRET = config.get("REFRESH_JWT_TOKEN_SECRET");
// Model
const User = require("../models/Users");

/**
 * @desc   Login User
 * @route  POST /api/auth/login
 * @access Public
 * */
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //Check fields
  if (!email || !password) {
    let labels = [];
    if (!email) labels.push(MISSING_EMAIL);
    if (!password) labels.push(MISSING_PASSWORD);

    return res.status(401).json({
      success: false,
      labels: labels,
      error: "Empty field(s)",
      status: 401,
    });
  }

  try {
    // Check existing user
    const user = await User.findOne({ email });
    if (!user) throw Error(USER_NOT_FOUND);

    // Check password
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) throw Error(INVALID_PASSWORD);

    // Create Access & Refresh Token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Insert refresh token with user in db
    await User.findByIdAndUpdate(user._id, {
      token: refreshToken,
    });
    // Send token. Refresh token as cookie and access token as regular response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken, user);
  } catch (err) {
    if (err.message === USER_NOT_FOUND || err.message === INVALID_PASSWORD) {
      return res.status(401).json({
        success: false,
        labels: [err.message],
        error: err.message,
        status: 401,
      });
    } else {
      return res.status(500).json({
        success: false,
        labels: [err.message],
        error: err.message,
        status: 500,
      });
    }
  }
};

/**
 * @desc   Register user
 * @route  POST /api/auth/register
 * @access Public
 */
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Check user input
  if (!name || !email || !password) {
    let labels = [];
    if (!name) labels.push(MISSING_NAME);
    if (!email) labels.push(MISSING_EMAIL);
    if (!password) labels.push(MISSING_PASSWORD);

    return res.status(400).json({
      success: false,
      status: 400,
      labels: labels,
      error: "Empty field(s)",
    });
  }

  try {
    // Hash the password
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });

    // Insert the user in mongoDB
    const user = await User.create({ name, email, password: hashedPassword });

    // Create Access & Refresh Token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Insert refresh token with user in db
    await User.findByIdAndUpdate(user._id, {
      token: refreshToken,
    });
    // Send token. Refresh token as cookie and access token as regular response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken, user);

    // res.status(201).json({
    //   success: true,
    //   msg: "User Created",
    //   data: {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //   },
    // });
  } catch (err) {
    if (err.name === "MongoError") {
      return res.status(400).json({
        success: false,
        status: 400,
        labels: EMAIL_EXIST,
        error: EMAIL_EXIST,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};

/**
 * @desc   Logout user
 * @route  POST /api/auth/logout
 * @access Private
 */
exports.logoutUser = async (req, res, next) => {
  try {
    // Find token in cookie
    const token = req.cookies.refreshtoken;
    if (!token) throw Error(TOKEN_NOT_FOUND);

    // Verify token
    let payload = null;
    payload = jwt.verify(token, REFRESH_JWT_SECRET);

    // Clear cookie
    res.clearCookie("refreshtoken", { path: REFRESH_TOKEN_COOKIE_PATH });
    // Remove token in mongoDB
    const user = await User.findOneAndUpdate(
      { _id: payload.userId },
      { token: undefined }
    );

    return res.status(200).json({
      success: true,
      message: "LOGOUT_SUCCESS",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Renew access token
 * @route  Post /api/auth/refresh_token
 * @access Public
 */
exports.refresh_token = async (req, res, next) => {
  try {
    // Find token in cookie
    const token = req.cookies.refreshtoken;

    //const token = req.body.refreshtoken;
    if (!token) throw Error(TOKEN_NOT_FOUND);

    // Verify token
    let payload = null;
    payload = jwt.verify(token, REFRESH_JWT_SECRET);

    // Find id in token with db
    const user = await User.findById(payload.userId);
    if (!user) throw Error(USER_NOT_FOUND);

    // Compare token:  db.token vs cookie.token
    if (user.token !== token) throw Error(TOKEN_NOT_MATCH);

    // Pass the validation
    // Generate token
    const accessToken = createAccessToken(user._id);
    //const refreshToken = createRefreshToken(user._id);

    // res.status(200).json({
    //   success: true,
    //   accesstoken: accessToken,
    // });
    return sendAccessToken(req, res, accessToken, user);
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      accesstoken: "",
    });
  }
};

/**
 * @desc   Get user
 * @route  Post /api/auth/user
 * @access Public
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error(USER_NOT_FOUND);

    return res.status(200).json({
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
