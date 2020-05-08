const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { getUsers, deleteUser } = require("../../controllers/users");

const {
  productAddToCart,
  removeProductFromCart,
  loadCart,
} = require("../../controllers/cart");

router.route("/").get(auth, getUsers);

router.route("/:id").delete(auth, deleteUser);

router.route("/cart").get(auth, loadCart);

router.route("/cart/add").get(auth, productAddToCart);

router.route("/cart/remove").get(auth, removeProductFromCart);

module.exports = router;
