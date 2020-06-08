const Product = require("../models/Products");
const User = require("../models/Users");
const multer = require("multer");
const path = require("path");
// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 3);

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
/**
 *
 *      Controller
 *
 */

/**
 * @desc  Upload Photo
 * @route POST /api/product/upload/image
 * @access private
 */
exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    if (req.files == undefined) {
      res.status(400).json({
        success: false,
        error: "No file(s) uploaded",
      });
      console.log("Product: Image(s) uploaded fail 'undefined'".red);
      return;
    } else {
      // file path array
      const pathArr = req.files.map((file) => `uploads/${file.filename}`);

      res.status(200).json({
        success: true,
        msg: "File(s) uploaded",
        filesPath: pathArr,
      });
      console.log(`Product: ${pathArr.length} image(s) uploaded`.green);
      return;
    }
  });
};

/**
 * @desc   Create Product
 * @route  Post /api/product/create
 * @access Private
 */
exports.createProduct = async (req, res) => {
  const { title, price, type, description, images } = req.body;

  // Check all fields input
  if (!title || !price || !type || !description || !images) {
    return res.status(400).json({
      success: false,
      msg: "Please enter all fields",
    });
  }

  try {
    const newProduct = new Product({
      creator: req.user.userId,
      price,
      title,
      description,
      type,
      images,
    });

    const savedProduct = newProduct.save();
    if (!savedProduct) throw Error("Something went wrong saving the product");

    res.status(200).json({
      success: true,
      products: {
        id: savedProduct._id,
        title: savedProduct.title,
      },
    });
    console.log("Product: Create Prodcut Success".green);
    return;
  } catch (err) {
    console.log(`Product: Create product fail Msg: ${err.message}`.red);
    res.status(400).json({
      success: false,
      error: err.message,
    });
    return;
  }
};

/**
 * @desc   Get All Products or filtered
 * @route  POST /api/product/
 * @access public
 */
exports.getProducts = async (req, res) => {
  let findArguments = {};

  // Text created by search field
  let searchTerm = req.body.searchTerm;

  // Classify the filter object
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArguments[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else if (key === "type") {
        findArguments[key] = req.body.filters[key];
      }
    }
  }

  try {
    let products = null;

    if (searchTerm) {
      let regex = new RegExp(searchTerm, "i");
      products = await Product.find(findArguments)
        .find({
          $text: { $search: regex },
        })
        .populate("creator");
    } else {
      products = await Product.find(findArguments);
    }

    res.status(200).json({
      success: true,
      products,
      postSize: products.length,
    });
    console.log(`Product: Get products scucess`.green);
    return;
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log(`Product: Get product fail Msg: ${err.message}`.red);
    return;
  }
};

/**
 * @desc   Get Products by ID(s)
 * @route  GET /api/product?id={productId}&type=single
 * @access public
 */
exports.getProductsByID = async (req, res) => {
  try {
    if (!req.query.id) throw Error("Please provide product id(s)");

    const productId = req.query.id;

    const products = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $inc: {
          views: 1,
        },
      },
      { new: true }
    );
    if (!products) throw Error("PRODUCT_NOT_FOUND");

    res.status(200).json({ success: true, products });

    console.log("Product: Get product by id sucess".green);
    return;
  } catch (err) {
    console.log(`Product: Get products by id fail Msg: ${err.message}`.red);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Delete Product by ID
 * @route  GET /api/product/remove?id={productId}
 * @access Private Admin
 */
exports.deleteProductsByID = async (req, res) => {
  try {
    const userID = req.user.userId;
    if (!req.query.productId)
      throw Error("Please provide product id that you want to delete");
    const productID = req.query.productId;

    const user = await User.findById(userID);
    if (!user) throw Error("User not found");
    if (user.role !== 1) throw Error("This API for admin only");

    const result = await Product.findOneAndRemove({ _id: { $in: productID } });
    if (!result) throw Error("Product Delete fail");

    res.status(200).json({
      success: true,
      data: result,
    });
    console.log("Product: Delete product success".green);
    return;
  } catch (err) {
    console.log(`Product: Delete product fail Msg: ${err.message} `.red);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Update Product by ID
 * @route  POST /api/product/update?id={productId}
 * @access Private Admin
 */
exports.updateProductsByID = async (req, res) => {
  try {
    const userID = req.user.userId;
    console.log(req.body);
    const user = await User.findById(userID);
    if (!user) throw Error("User not found");
    if (user.role !== 1) throw Error("This API for admin only");

    const result = await Product.findOneAndUpdate({ _id: { $in: productID } });
    if (!result) throw Error("Product Update fail");

    res.status(200).json({
      success: true,
      data: result,
    });
    console.log("Product: Update product by id success".green);

    return;
  } catch (err) {
    console.log(`Product: Update product by id fail Msg: ${err.message}`.red);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
