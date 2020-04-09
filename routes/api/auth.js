const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { loginUser, registerUser, getUser } = require("../../controllers/auth");

router.route("/login").post(loginUser);

router.route("/register").post(registerUser);

router.route("/user").get(auth, getUser);

module.exports = router;
