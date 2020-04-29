const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { uploadImage } = require("../../controllers/product");

router.route("/upload/image").post(uploadImage);

module.exports = router;
