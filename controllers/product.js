const Product = require("../models/Products");
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
      return res.status(400).json({
        success: false,
        error: "No file(s) uploaded",
      });
    } else {
      // file path array
      const pathArr = req.files.map((file) => `uploads/${file.filename}`);

      return res.status(200).json({
        success: true,
        msg: "File(s) uploaded",
        filesPath: pathArr,
      });
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

    return res.status(200).json({
      success: true,
      products: {
        id: savedProduct._id,
        title: savedProduct.title,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
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

    return res.status(200).json({
      success: true,
      products,
      postSize: products.length,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Get Products by ID(s)
 * @route  GET /api/product?id={productId}&type=single
 * @route  GET /api/product?id={productIds}&type=array
 * @access public
 */
exports.getProductsByID = async (req, res) => {
  try {
    if (!req.query.id) throw Error("Please provide product id(s)");
    if (
      !req.query.type ||
      (req.query.type !== "single" && req.query.type !== "array")
    )
      throw Error('type should only be "array" or "single"');

    let productId = req.query.id;

    if (req.query.type === "array") {
      productId = productId.split(",").map((id) => id);
    }
    const products = await Product.find({ _id: { $in: productId } });
    if (!products) throw Error("PRODUCT_NOT_FOUND");

    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
//Update Product (by ID)
//Remove Product
