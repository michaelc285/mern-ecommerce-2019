const User = require("../models/Users");

/**
 * @desc   Get History in User
 * @route  GET /api/user/history
 * @access Private
 */
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await User.findById(userId).select("history");

    return res.status(200).json({
      success: true,
      history: result.history,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Get All Histories in All User
 * @route  GET
 * @access Private
 */
