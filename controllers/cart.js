const User = require("../models/Users");
const Product = require("../models/Products");
const Payment = require("../models/Payment");
const async = require("async");
const { mergeCartAndProduct } = require("../utils/mergeData");
/**
 * @desc   Add product to cart
 * @route  GET /api/users/cart/add?productId={productId}
 * @access Private
 */
exports.AddProductToCart = async (req, res) => {
  try {
    // Check product Id exisit in query ?
    if (!req.query.productId) throw Error("Please provide product id");
    // Get user id and product id
    const userID = req.user.userId;
    const productID = req.query.productId;

    // Check product exisit ?
    const product = await Product.findById(productID);

    // GET user's cart
    const user = await User.findById(userID);

    // Check is product exisit in cart or not
    let exisitFlag = false;

    user.cart.forEach((item) => {
      if (item.id == productID) exisitFlag = true;
    });

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

    //Combine and match cart data with images
    const cart = updateUser.cart;
    const result = await mergeCartAndProduct(cart);

    res.status(200).json({
      success: true,
      cart: result,
    });

    console.log("Cart: Add product to cart success".green);
    return;
  } catch (err) {
    console.log(`Cart: Add product to cart fail Msg ${err.message}`.green);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Remove product from cart
 * @route  GET /api/users/cart/remove?productId={productId}
 * @access Private
 */
exports.removeProductFromCart = async (req, res) => {
  try {
    // Check product Id exisit in query ?
    if (!req.query.productId) throw Error("Please provide product id");

    // Get user id and product id
    const userID = req.user.userId;
    const productID = req.query.productId;

    // Remove product from cart
    const user = await User.findByIdAndUpdate(
      userID,
      { $pull: { cart: { id: productID } } },
      { new: true }
    );
    if (!user) throw Error("Product remove fail");

    //Combine and match cart data with images
    const cart = user.cart;
    const result = await mergeCartAndProduct(cart);

    res.status(200).json({
      success: true,
      cart: result,
    });

    console.log("Cart: Remove product from cart success".green);
    return;
  } catch (err) {
    console.log(
      `Cart: Remove product from cart fail Msg: ${err.message}`.green
    );
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Get cart
 * @route  GET /api/users/cart/
 * @access Private
 */
exports.loadCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("-password")
      .sort({ _id: 1 });

    //Combine and match cart data with images
    const cart = user.cart;
    const result = await mergeCartAndProduct(cart);

    res.status(200).json({
      success: true,
      cart: result,
    });
    console.log("Cart: Load cart success".green);
    return;
  } catch (err) {
    console.log(`Cart: Load cart fail Msg:${err.message}`.red);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Update product quantity in cart
 * @route  GET /api/users/cart/update?productId={productId}&quantity={quantity}
 * @access Private
 */
exports.updateProductInCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.query.productId) throw Error("Please provide productId");
    if (!req.query.quantity) throw Error("Please provide quantity");

    const productId = req.query.productId;
    const quantity = Number(req.query.quantity);

    // find user and update product quantity
    const user = await User.findOneAndUpdate(
      { _id: userId, "cart.id": productId },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    ).select("-password");
    if (!user) throw Error("Update fail");

    //Combine and match cart data with images
    const cart = user.cart;
    const result = await mergeCartAndProduct(cart);

    res.status(200).json({
      success: true,
      cart: result,
    });
    console.log("Cart: Update product quantity in cart success".green);
    return;
  } catch (err) {
    console.log(
      `Cart: Update product quantity in cart fail ${err.message}`.green
    );
    return res.status(401).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Payment
 * @route  POST /api/users/cart/payment
 * @access Private
 */
exports.buyProcessDone = async (req, res) => {
  try {
    // Get user ID
    const userId = req.user.userId;

    // Create history array
    const history = req.body.cart.map((item) => {
      return {
        purchaseAt: Date.now(),
        name: item.title,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        orderID: req.body.data.orderID,
      };
    });

    // Bills object
    const bills = {
      id: req.body.data.orderID,
      contactDetails: req.body.contactDetails,
      purchaseAt: Date.now(),
      history,
      bills: req.body.bills,
    };

    // Create Transaction Data
    // Add user info to transaction object
    const user = {
      id: userId,
      name: req.body.details.payer.name.given_name,
      surname: req.body.details.payer.name.surname,
      email: req.body.details.payer.email_address,
      contactDetails: req.body.contactDetails,
    };

    const paymentData = {
      details: req.body.details,
      data: req.body.data,
    };

    const transaction = {
      user,
      data: paymentData,
      product: history,
    };

    // Update user by ID, add bills into history and reset cart to empty array
    const userAfterUpdate = await User.findByIdAndUpdate(
      userId,
      { $push: { history: bills }, $set: { cart: [] } },
      { new: true }
    );
    if (!userAfterUpdate) throw Error("User Update Fail");

    // Create payment
    const payment = new Payment(transaction);
    const paymentAfterSave = await payment.save();
    if (!paymentAfterSave) throw Error("Payment Save Fail");

    // Using the return values from payment to update the products sold count
    const productInPayment = payment.product.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    // Update sold value
    await async.eachSeries(productInPayment, async (item) => {
      await Product.updateOne(
        { _id: item.id },
        {
          $inc: {
            sold: item.quantity,
          },
        },
        { new: false }
      );
    });

    res.status(200).json({
      success: true,
    });
    console.log("Cart: Buy process success".green);
    return;
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log(`Cart: Buy process fail Msg:{err.message}`.red);
    return;
  }
};
