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

    //Combine and match cart data with images
    let resultArr = [...cartArr];
    resultArr.forEach((item, i) => {
      productInfoArr.forEach((info) => {
        if (item.id == info._id) {
          resultArr[i].images = info.images;
          resultArr[i].title = info.title;
          resultArr[i].type = info.type;
          resultArr[i].price = info.price;
        }
      });
    });
    return resultArr;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
