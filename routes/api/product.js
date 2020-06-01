const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  uploadImage,
  createProduct,
  getProducts,
  getProductsByID,
  deleteProductsByID,
  updateProductsByID,
} = require("../../controllers/product");

router.route("/upload/image").post(auth, uploadImage);

router.route("/create").post(auth, createProduct);

router.route("/remove").get(auth, deleteProductsByID);

router.route("/update").post(auth, updateProductsByID);

router.route("/").post(getProducts).get(getProductsByID);

module.exports = router;
