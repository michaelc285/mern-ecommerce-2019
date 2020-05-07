const User = require("../models/Users");
const Product = require("../models/Products");

/**
 * @desc   Add product to cart
 * @route  GET /api/user/cart/add?id={productId}
 * @access Private
 */
exports.productAddToCart = async (req, res) => {
  try {
    // Check product Id exisit in query ?
    if (!req.query.id) throw Error("Please provide product id");
    // Get user id and product id
    const userID = req.user.userId;
    const productID = req.query.id;

    // Check product exisit ?
    const product = await Product.findById(productID);

    // GET user's cart
    const user = await User.findById(userID);

    // Check is product exisit in cart or not
    let exisitFlag = false;

    user.cart.forEach((item) => {
      if (item.id == productID) exisitFlag = true;
    });
    console.log(exisitFlag);

    // Add product into cart
    let updateUser = null;

    if (exisitFlag) {
      // Product quantity increase 1 baseed on the exisit data
      updateUser = await User.findOneAndUpdate(
        { _id: userID, "cart.id": productID },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );

      if (!updateUser) throw Error("Can not add more to cart");
    } else {
      // Push product into cart array
      updateUser = await User.findByIdAndUpdate(
        userID,
        {
          $push: {
            cart: {
              id: productID,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }
      );

      if (!updateUser) throw Error("Can not add to cart");
    }

    return res.status(200).json({
      success: true,
      cart: updateUser.cart,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Remove product from cart
 * @route  GET /api/user/cart/remove?id={productId}
 * @access Private
 */
exports.removeProductFromCart = async (req, res) => {
  try {
    // Check product Id exisit in query ?
    if (!req.query.id) throw Error("Please provide product id");

    // Get user id and product id
    const userID = req.user.userId;
    const productID = req.query.id;

    // Remove product from cart
    const user = await User.findByIdAndUpdate(
      userID,
      { $pull: { cart: { id: productID } } },
      { new: true }
    );
    if (!user) throw Error("Product remove fail");

    const cart = user.cart;
    const productIdArr = cart.map((item) => item.id);

    const products = await Product.find({ _id: { $in: productIdArr } });

    return res.status(200).json({
      success: true,
      cart,
      products,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
