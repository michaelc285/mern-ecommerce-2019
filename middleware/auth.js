const config = require("config");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const auth = (req, res, next) => {
  // accesstoken => `Bearer abcdasjoivj2091u4012cna9821h9`
  const token = req.header("authorization").split(" ")[1];

  //Check for token
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No token exists",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
