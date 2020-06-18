const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { getHistory } = require("../../controllers/history");
const {
  getUsers,
  updateUser,
  deleteUser,
  createAccountByAdmin,
  editProfileByUser,
  updateAddressByAdmin,
  getUserProfileByToken,
  deleteAccountByUser,
  updateAddressByUser,
} = require("../../controllers/users");
const {
  AddProductToCart,
  removeProductFromCart,
  updateProductInCart,
  loadCart,
  buyProcessDone,
} = require("../../controllers/cart");

/**
 *  Route
 */

router
  .route("/")
  .get(auth, admin, getUsers)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser);

router.route("/:id/address").put(auth, admin, updateAddressByAdmin);

router
  .route("/profile")
  .put(auth, editProfileByUser)
  .get(auth, getUserProfileByToken)
  .delete(auth, deleteAccountByUser);

router.route("/profile/address").put(auth, updateAddressByUser);

router.route("/create").post(auth, admin, createAccountByAdmin);

router.route("/history").get(auth, getHistory);

router.route("/cart").get(auth, loadCart);

router.route("/cart/update/").get(auth, updateProductInCart);

router.route("/cart/add").get(auth, AddProductToCart);

router.route("/cart/remove/").get(auth, removeProductFromCart);

router.route("/cart/buyProcessDone").post(auth, buyProcessDone);

module.exports = router;
