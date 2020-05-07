const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { getUsers, deleteUser } = require("../../controllers/users");
const { getProductsByID } = require("../../controllers/product");
const {
  productAddToCart,
  removeProductFromCart,
} = require("../../controllers/cart");

router.route("/").get(auth, getUsers);

router.route("/:id").delete(auth, deleteUser);

router.route("/cart").get(auth, getProductsByID);

router.route("/cart/add").get(auth, productAddToCart);

router.route("/cart/remove").get(auth, removeProductFromCart);

module.exports = router;
