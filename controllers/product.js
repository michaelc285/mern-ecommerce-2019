const Product = require("../models/Products");
const User = require("../models/Users");
const config = require("config");
const jwt = require("jsonwebtoken");
const ACCESS_JWT_SECRET = config.get("ACCESS_JWT_TOKEN_SECRET");
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
    } else {
      // file path array
      const pathArr = req.files.map((file) => `uploads/${file.filename}`);

      res.status(200).json({
        success: true,
        msg: "File(s) uploaded",
        filesPath: pathArr,
      });
    }
  });
};

//Create Product
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
      title,
      description,
      type,
      images,
    });

    const savedProduct = newProduct.save();
    if (!savedProduct) throw Error("Something went wrong saving the product");

    res.status(200).json({
      success: true,
      product: {
        id: savedProduct._id,
        title: savedProduct.title,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

//Get All Products
//Get Product (by ID)
//Update Product (by ID)
//Remove Product
