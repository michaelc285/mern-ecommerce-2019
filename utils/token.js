const { sign } = require("jsonwebtoken");
const config = require("config");
const REFRESH_TOKEN_COOKIE_PATH = require("../constant/path");

// -------------Create-------------------

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_JWT_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_JWT_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

// -----------Send------------

const sendAccessToken = (req, res, accesstoken, userInfo) => {
  res.status(200).json({
    success: true,
    accesstoken,
    data: {
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      cart: userInfo.cart,
      history: userInfo.history,
      contactDetails: userInfo.contactDetails,
    },
  });
  console.log("Token: Send Access Token Success".green);
};

const sendRefreshToken = (res, token) => {
  res.status(200).cookie("refreshtoken", token, {
    httpOnly: true,
    path: REFRESH_TOKEN_COOKIE_PATH,
  });
  console.log("Token: Send Refresh Token Success".green);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
