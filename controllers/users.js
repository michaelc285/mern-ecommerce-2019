const User = require("../models/Users");
const Product = require("../models/Products");

/**
 * @desc   Get all user
 * @route  /api/user
 * @access Private
 */
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: user,
    });
  }
};

/**
 * @desc   Delete user
 * @route  DELETE /api/user:id
 * @access Private
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
