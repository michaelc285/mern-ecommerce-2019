const User = require("../models/Users");

const admin = async (req, res, next) => {
  try {
    const id = req.user.userId;

    const user = await User.findById(id).select("-password");
    if (user.role !== 1) throw Error("Permission required");

    req.userData = user;

    console.log("Mid Admin: Permission pass".green);
    next();
  } catch (err) {
    console.log(`Admin: Msg: ${err.message}`.red);
    res.status(401).json({
      success: false,
      msg: err.message,
    });
    return;
  }
};

module.exports = admin;
