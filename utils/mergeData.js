const Product = require("../models/Products");

// Merge user cart and product detail infomations (img, price, title, type)
exports.mergeCartAndProduct = async (cartArr) => {
  try {
    const productsIdArr = cartArr.map((item) => item.id);
    const productInfoArr = await Product.find({ _id: { $in: productsIdArr } })
      .sort({
        _id: 1,
      })
      .select("images title type price");
    if (!productInfoArr) throw Error("Product info search error");

    //Merge user require product quantity with product details info

    productInfoArr.forEach((productInfo, index) => {
      cartArr.forEach((cart) => {
        if (cart.id == productInfo._id) {
          productInfoArr[index].quantity = cart.quantity;
          productInfoArr[index].date = cart.date;
        }
      });
    });

    return productInfoArr;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
