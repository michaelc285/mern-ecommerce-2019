const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 50,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    trim: true,
    unique: [true, "Email already exsit"],
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please enter your password"],
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  contactDetails: {
    type: Object,
    default: {
      addressLine1: "",
      addressLine2: "",
      townOrCity: "",
      postalCode: "",
      phone: "",
    },
  },
  token: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
