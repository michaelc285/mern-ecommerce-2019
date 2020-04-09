const express = require("express");
const router = express.Router();
const { getUsers, deleteUser } = require("../../controllers/users");

router.route("/").get(getUsers);

router.route("/:id").delete(deleteUser);

module.exports = router;
