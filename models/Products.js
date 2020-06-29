const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "Please enter product title"],
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProductSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 2,
    },
  }
);

module.exports = mongoose.model("product", ProductSchema);
