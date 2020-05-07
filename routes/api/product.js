const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  uploadImage,
  createProduct,
  getProducts,
  getProductsByID,
} = require("../../controllers/product");

router.route("/upload/image").post(auth, uploadImage);

router.route("/create").post(auth, createProduct);

router.route("/").post(getProducts).get(getProductsByID);

module.exports = router;
