const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../helpers/hashPassword");
/**
 * @desc   Get user
 * @route  GET /api/users
 * @access Private (Admin)
 */
exports.getUsers = async (req, res, next) => {
  try {
    const type = req.query.type;
    if (!type) throw Error("Please provide type");
    if (type === "single") {
      const userId = req.query.id;
      if (!userId) throw Error("Please provide user id");

      const user = await User.findOne({ _id: userId }).select(
        "-token -password"
      );

      if (!user) throw Error("User not found");

      res.status(200).json({
        success: true,
        user,
      });
    } else if (type === "all") {
      const users = await User.find().select("-token -password");
      if (!users) throw Error("User not found");

      res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } else {
      throw Error("type should be all / single");
    }
    console.log(`Users: Get ${type} user success`.green);
    return;
  } catch (err) {
    console.log(`Users: Get user fail : ${err.message}`.red);
    res.status(404).json({
      success: false,
      error: err.message,
    });
    return;
  }
};

/**
 * @desc   Update user Email/Password/Name
 * @route  PUT /api/user?id
 * @access Private
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) throw Error("Please Provide User id");

    if (!req.body) {
      return res.status(204).json({ success: false, msg: "Nothing in body" });
    }

    let updateContents = {};

    // Check email
    if (req.body.email) {
      updateContents["email"] = req.body.email;
    }

    // Check Name
    if (req.body.name) {
      updateContents["name"] = req.body.name;
    }

    // Check password
    if (req.body.password) {
      updateContents["password"] = await hashPassword(req.body.password);
    }

    // Check role
    if (req.body.role) {
      if (req.body.role !== 0 || req.body.role !== 1)
        throw Error("Role shold be 0 / 1");

      updateContents["role"] = req.body.role;
    }

    const user = await User.findOneAndUpdate({ _id: userId }, updateContents, {
      new: true,
    });

    res.status(200).json({
      success: true,
    });
    console.log("Users: Update user success".green);
    return;
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
    console.log(`Users: Update user fail Msg: ${err.message}`.red);
    return;
  }
};

/**
 * @desc   Delete user
 * @route  DELETE /api/users:id
 * @access Private
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.query.id;
    if (!userId) throw Error("Please provide user id that you want to delete");

    await User.findOneAndRemove({ _id: userId });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Update User by Admin
// Update User by User
// Remove User by Admin
// Remove User by User
