const User = require("../models/Users");
const Product = require("../models/Products");
const Payment = require("../models/Payment");
const async = require("async");
/**
 * @desc   Add product to cart
 * @route  GET /api/user/cart/add?id={productId}
 * @access Private
 */
exports.productAddToCart = async (req, res) => {
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

    const productsIdArr = updateUser.cart.map((item) => item.id);
    const productInfo = await Product.find({ _id: { $in: productsIdArr } })
      .sort({
        _id: 1,
      })
      .select("images title type price");

    let cart = updateUser.cart;
    //Combine and match cart data with images
    cart.forEach((item) => {
      productInfo.forEach((info, i) => {
        if (item.id == info._id) {
          cart[i].images = info.images;
          cart[i].title = info.title;
          cart[i].type = info.type;
          cart[i].price = info.price;
        }
      });
    });

    return res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (err) {
    console.log(err);
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

/**
 * @desc   Get cart
 * @route  GET /api/user/cart/
 * @access Private
 */
exports.loadCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("-password")
      .sort({ _id: 1 });

    const cart = user.cart;
    const productsIdArr = cart.map((item) => item.id);

    const productInfo = await Product.find({ _id: { $in: productsIdArr } })
      .sort({
        _id: 1,
      })
      .select("images title type price");

    //Combine and match cart data with images
    cart.forEach((item) => {
      productInfo.forEach((info, i) => {
        if (item.id == info._id) {
          cart[i].images = info.images;
          cart[i].title = info.title;
          cart[i].type = info.type;
          cart[i].price = info.price;
        }
      });
    });

    res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Payment
 * @route  POST /api/user/cart/payment
 * @access Private
 */
exports.buyProcessDone = async (req, res) => {
  let payerInfo = {};
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
      history,
    };

    // Create Transaction Data
    // Add user info to transaction object
    const user = {
      id: userId,
      name: req.body.details.payer.name.given_name,
      surname: req.body.details.payer.name.surname,
      email: req.body.details.payer.email_address,
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
      await Product.update(
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
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
