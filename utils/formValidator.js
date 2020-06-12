const User = require("../models/Users");

// Password
exports.passwordFormatValidator = (password) => {
  if (
    typeof password === "string" &&
    password.length >= 4 &&
    password.length <= 16
  ) {
    return true;
  } else {
    return false;
  }
};

// name
exports.nameFormatValidator = (name) => {
  if (typeof name === "string" && name.length >= 1 && name.length <= 50) {
    return true;
  } else {
    return false;
  }
};
//email

exports.emailValidator = (email) => {
  return User.findOne({
    email,
  })
    .then((res) => {
      if (res) {
        // email exists
        return false;
      } else {
        // email not using
        return true;
      }
    })
    .catch((err) => {
      console.log(`Users: email validation error ${err.message}`.red);
      return false;
    });
};

// Role
exports.roleFormatValidator = (role) => {
  if (typeof role === "boolean") {
    role = role ? 1 : 0;
  }

  if (role === 1 || role === 0) {
    return true;
  } else {
    return false;
  }
};
