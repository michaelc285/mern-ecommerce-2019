const User = require("../models/Users");

// @desc Get all user
// @route /api/v1/user
// @access Public
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: user
    });
  }
};

// @desc Add user
// @route Post /api/v1/user
// @access Public
exports.addUser = async (req, res, next) => {
  try {
    //const { name, email, password } = req.body;

    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    if (err.name === "MongoError") {
      const messages = "Email already exsit";

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: user
      });
    }
  }
};

// @desc Delete user
// @route DELETE /api/v1/user:id
// @access Public
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found"
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
