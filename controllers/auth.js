const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../utils/hashPassword");
const {
  emailValidator,
  nameFormatValidator,
  passwordFormatValidator,
} = require("../utils/formValidator");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/token");
const {
  NAME_MISSING,
  EMAIL_MISSING,
  PASSWORD_MISSING,
  EMAIL_EXIST,
  PASSWORD_INVALID,
  USER_NOT_FOUND,
  TOKEN_NOT_MATCH,
  TOKEN_NOT_FOUND,
  LOGOUT_SUCCESS,
  PASSWORD_FORMAT,
  NAME_FORMAT,
} = require("../constant/types.js");
// Model
const User = require("../models/Users");
const REFRESH_TOKEN_COOKIE_PATH = require("../constant/path");
/**
 * @desc   Login User
 * @route  POST /api/auth/login
 * @access Public
 * */
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //Check fields
  let errors = [];
  if (!email || !password) {
    if (!email) errors.push(EMAIL_MISSING);
    if (!password) errors.push(PASSWORD_MISSING);
    // Blcok
    res.status(401).json({
      success: false,
      errors,
    });
    console.log(`Auth: User login fail`.red);
    return;
  }

  try {
    // Check existing user
    const user = await User.findOne({ email });
    if (!user) throw Error(USER_NOT_FOUND);

    // Check password
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) throw Error(PASSWORD_INVALID);

    // Create Access & Refresh Token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Insert refresh token with user in db
    await User.findByIdAndUpdate(
      user._id,
      {
        accessToken: accessToken,
        token: refreshToken,
      },
      { new: true }
    );

    // Send token. Refresh token as cookie and access token as regular response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken, user);
    console.log("Auth: Login Success".green);
    return;
  } catch (err) {
    if (err.message === USER_NOT_FOUND || err.message === PASSWORD_INVALID) {
      res.status(401).json({
        success: false,
        errors: [err.message],
      });
      console.log(`Auth: Login Process error: ${err.message}`.red);
      return;
    } else {
      res.status(500).json({
        success: false,
        errors: [err.message],
      });
      console.log(`Auth: Internal Server Error: ${err.message}`.red);
      return;
    }
  }
};

/**
 * @desc   Register user
 * @route  POST /api/auth/register
 * @access Public
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check user input
    let errors = [];
    // Name Check
    if (name) {
      const nameValid = nameFormatValidator(name);
      if (nameValid === false) {
        errors.push(NAME_FORMAT);
      }
    } else {
      errors.push(NAME_MISSING);
    }
    // Email Check
    if (email) {
      const emailValid = await emailValidator(email);
      if (emailValid === false) {
        errors.push(EMAIL_EXIST);
      }
    } else {
      errors.push(EMAIL_MISSING);
    }

    // Password Check
    if (password) {
      const passwordValid = passwordFormatValidator(password);
      if (passwordValid === false) {
        errors.push(PASSWORD_FORMAT);
      }
    } else {
      errors.push(PASSWORD_MISSING);
    }

    // Error block
    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        errors,
      });
      console.log(`Auth: Register fail, ${errors.length} error(s)`.red);
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the user in mongoDB
    const user = await User.create({ name, email, password: hashedPassword });

    // Create Access & Refresh Token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Insert refresh token with user in db
    const result = await User.findOneAndUpdate(
      { _id: user._id },
      {
        token: refreshToken,
      },
      { new: true }
    );
    if (!result) throw Error(EMAIL_EXIST);

    // Send token. Refresh token as cookie and access token as regular response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken, user);

    console.log("Auth: Register success".green);
    return;
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [err.message],
    });
    console.log("Auth: Internal server error".red);
    return;
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
    const payload = jwt.verify(token, process.env.REFRESH_JWT_TOKEN_SECRET);

    // Clear cookie
    res.clearCookie("refreshtoken", { path: REFRESH_TOKEN_COOKIE_PATH });
    // Remove token in mongoDB
    const user = await User.findOneAndUpdate(
      { _id: payload.userId },
      { token: null, accessToken: null }
    );

    res.status(200).json({
      success: true,
      message: LOGOUT_SUCCESS,
    });
    console.log("Auth: Logout Success".green);
    return;
  } catch (err) {
    res.status(401).json({
      success: false,
      error: [err.message],
    });
    console.log(`Auth: Logout Process error: ${err.message}`.red);
    return;
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
    payload = jwt.verify(token, process.env.REFRESH_JWT_TOKEN_SECRET);

    // Find id in token with db
    const user = await User.findById(payload.userId);
    if (!user) throw Error(USER_NOT_FOUND);

    // Compare token:  db.token vs cookie.token
    if (user.token !== token) throw Error(TOKEN_NOT_MATCH);

    // Pass the validation
    // Generate token
    const accessToken = createAccessToken(user._id);
    await User.findOneAndUpdate({ _id: user._id }, { accessToken });
    //const refreshToken = createRefreshToken(user._id);

    sendAccessToken(req, res, accessToken, user);
    console.log("Auth: Token Refresh Success".green);
    return;
  } catch (err) {
    res.status(401).json({
      success: false,
      errors: [err.message],
      accesstoken: "",
    });
    console.log(`Auth: Token Refresh Process error: ${err.message}`.red);
    return;
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

    res.status(200).json({
      success: true,
      data: user,
    });
    console.log("Auth: Get User Success".green);
    return;
  } catch (err) {
    console.log(`Auth: Get User Process error: ${err.message}`.red);
    return res.status(400).json({
      success: false,
      errors: [err.message],
    });
  }
};
