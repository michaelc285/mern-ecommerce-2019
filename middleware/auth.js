const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // accesstoken => `Bearer abcdasjoivj2091u4012cna9821h9`
  const token = req.header("authorization").split(" ")[1];

  //Check for token
  if (!token) {
    res.status(401).json({
      success: false,
      msg: "No token exists",
    });
    console.log("Mid Auth: No token exists".red);
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
    // Add user from payload
    req.user = decoded;
    console.log("Mid Auth: Token Valid".green);
    next();
  } catch (err) {
    console.log("Mid Auth: Token Invalid".red);
    res.status(401).json({ msg: "Token is not valid" });
    return;
  }
};

module.exports = auth;
