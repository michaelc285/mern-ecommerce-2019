const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { uploadImage, createProduct } = require("../../controllers/product");

router.route("/upload/image").post(auth, uploadImage);

router.route("/create").post(auth, createProduct);

module.exports = router;
