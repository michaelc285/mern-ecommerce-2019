const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    trim: true,
    unique: [true, "Email already exsit"],
    required: [true, "Please enter your email"]
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please enter your password"]
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchema);
