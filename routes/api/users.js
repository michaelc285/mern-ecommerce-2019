const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { getHistory } = require("../../controllers/history");
const { getUsers, deleteUser } = require("../../controllers/users");
const {
  AddProductToCart,
  removeProductFromCart,
  updateProductInCart,
  loadCart,
  buyProcessDone,
} = require("../../controllers/cart");

router.route("/").get(auth, getUsers);

router.route("/:id").delete(auth, deleteUser);

router.route("/history").get(auth, getHistory);

router.route("/cart").get(auth, loadCart);

router.route("/cart/update/").get(auth, updateProductInCart);

router.route("/cart/add").get(auth, AddProductToCart);

router.route("/cart/remove/").get(auth, removeProductFromCart);

router.route("/cart/buyProcessDone").post(auth, buyProcessDone);

module.exports = router;
