const config = require("config");
const jwt = require("jsonwebtoken");
const ACCESS_JWT_SECRET = config.get("ACCESS_JWT_TOKEN_SECRET");

const auth = (req, res, next) => {
  // accesstoken => `Bearer abcdasjoivj2091u4012cna9821h9`
  const token = req.header("authorization").split(" ")[1];

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
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
