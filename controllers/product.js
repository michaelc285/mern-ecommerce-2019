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
}).single("image");

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
      res.json({
        success: false,
        msg: err.message,
      });
    } else {
      if (req.file == undefined) {
        res.json({
          success: false,
          msg: "No file uploaded",
        });
      } else {
        return res.json({
          success: true,
          msg: "File uploaded",
          data: {
            name: req.file.filename,
            path: `uploads/${req.file.filename}`,
          },
        });
      }
    }
  });
};

//Create Product
/**
 * @desc   Create Product
 * @route  Post /api/product
 * @access Private
 */
exports.createProduct = (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        msg: err.message,
      });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  });
};

//Get All Products
//Get Product (by ID)
//Update Product (by ID)
//Remove Product
