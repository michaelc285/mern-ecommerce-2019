const config = require("config");
const jwt = require("jsonwebtoken");
const ACCESS_JWT_SECRET = config.get("ACCESS_JWT_TOKEN_SECRET");

const auth = (req, res, next) => {
  const token = req.header("accesstoken");

  //Check for token
  if (!token)
    return res.status(400).json({
      success: false,
      msg: "No token exists",
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, ACCESS_JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    console.log(decoded);
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
