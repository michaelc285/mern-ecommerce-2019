const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  loginUser,
  registerUser,
  getUser,
  logoutUser,
  refresh_token,
} = require("../../controllers/auth");

router.route("/login").post(loginUser);

router.route("/register").post(registerUser);

router.route("/user").get(auth, getUser);

router.route("/logout").post(logoutUser);

router.route("/refresh_token").post(refresh_token);

module.exports = router;
