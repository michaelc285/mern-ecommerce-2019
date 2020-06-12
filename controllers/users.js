const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utils/hashPassword");
const {
  emailValidator,
  nameFormatValidator,
  passwordFormatValidator,
  roleFormatValidator,
} = require("../utils/formValidator");
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
 * @desc   Update user Email / Password / Name / Role
 * @route  PUT /api/users?id
 * @access Private (Admin)
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) throw Error("Please Provide User id");

    if (!req.body) {
      return res.status(204).json({ success: false, msg: "Nothing in body" });
    }

    let updateContents = {};
    let errors = [];
    // Check email
    if (req.body.email !== undefined) {
      // Check Email exist or not
      const emailValid = await emailValidator(req.body.email);
      // If exist push msg to errros[], if not allow it add in to updateContents
      if (emailValid) {
        updateContents["email"] = req.body.email;
      } else {
        errors.push("EMAIL_EXIST");
      }
    }

    // Check Name
    if (req.body.name !== undefined) {
      // Name Format validation
      const nameValid = nameFormatValidator(req.body.name);

      if (nameValid) {
        updateContents["name"] = req.body.name;
      } else {
        errors.push("NAME_LENGTH");
      }
    }

    // Check password
    if (req.body.password !== undefined) {
      // Password Format validation
      const passwordValid = passwordFormatValidator(req.body.password);

      if (passwordValid) {
        updateContents["password"] = await hashPassword(req.body.password);
      } else {
        errors.push("PASSWORD_FORMAT");
      }
    }

    // Check role
    if (req.body.role !== undefined) {
      // Role format validation
      const roleValid = roleFormatValidator(req.body.role);

      if (role) {
        updateContents["role"] = req.body.role;
      } else {
        throw Error("Role field only accept 1 / 0.  1 = Admin, 0 = User");
      }
    }
    // Errors block
    if (errors.length > 0) {
      res.status(422).json({
        success: false,
        errors,
      });
      console.log(errors);
      console.log(
        `Users: update user fail, ${errors.length} field(s) fail`.red
      );
      return;
    }
    // Without any errors
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
 * @access Private (Admin)
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.query.id;
    if (!userId) throw Error("Please provide user id that you want to delete");

    await User.findOneAndRemove({ _id: userId });

    res.status(200).json({
      success: true,
    });
    console.log("Users: Delete account success".green);
    return;
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
    console.log(`Users: Delete account fail ${err.message}`.red);
    return;
  }
};

/**
 * @desc   Crate account by admin
 * @route  POST /api/users/create
 * @access Private (Admin)
 */
exports.createAccountByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let accountContent = {};
    let errors = [];

    //Name check
    if (name !== undefined) {
      // Name Format validation
      const nameValid = nameFormatValidator(name);

      if (nameValid) {
        accountContent["name"] = name;
      } else {
        errors.push("NAME_LENGTH");
      }
    } else {
      errors.push("NAME_MISSING");
    }

    // Email Check
    if (email !== undefined) {
      // Check Email exist or not
      const emailValid = await emailValidator(email);
      // If exist push msg to errros[], if not allow it add in to updateContents
      if (emailValid) {
        accountContent["email"] = email;
      } else {
        errors.push("EMAIL_EXIST");
      }
    } else {
      errors.push("EMAIL_MISSING");
    }

    // Password check
    if (password !== undefined) {
      // Password Format validation
      const passwordValid = passwordFormatValidator(password);

      if (passwordValid) {
        accountContent["password"] = await hashPassword(password);
      } else {
        errors.push("PASSWORD_FORMAT");
      }
    } else {
      errors.push("PASSWORD_MISSING");
    }

    // Role Check
    if (role !== undefined) {
      // Role format validation
      const roleValid = roleFormatValidator(role);

      if (roleValid) {
        accountContent["role"] = role ? 1 : 0;
      } else {
        throw Error("Role field only accept 1 / 0.  1 = Admin, 0 = User");
      }
    }

    // Errors block
    if (errors.length > 0) {
      res.status(422).json({
        success: false,
        errors,
      });
      console.log(errors);
      console.log(
        `Users: update create fail, ${errors.length} field(s) fail`.red
      );
      return;
    }
    // Without any errors
    const user = await User.create(accountContent);

    res.status(200).json({
      success: true,
      user,
    });

    console.log("Users: create account by admin success".green);
    return;
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
    console.log(`Users: create account fail ${err.message}`.red);
    return;
  }
};

// Update User by User
// Remove User by User
