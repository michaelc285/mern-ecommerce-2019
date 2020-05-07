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

//Create Product
/**
 * @desc   Get Products
 * @route  POST /api/product/create
 * @access public
 */
exports.getProducts = async (req, res) => {
  let findArguments = {};

  let searchTerm = req.body.searchTerm;

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
    if (searchTerm) {
      let regex = new RegExp(searchTerm, "i");
      const products = await Product.find(findArguments)
        .find({
          $text: { $search: regex },
        })
        .populate("creator");

      res.status(200).json({
        success: true,
        products,
        postSize: products.length,
      });
    } else {
      const products = await Product.find(findArguments);

      res.status(200).json({
        success: true,
        products,
        postSize: products.length,
      });
    }

    // res.status(200).json({
    //   success: true,
    //   products,
    //   postSize: products.length,
    // });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * @desc   Get Products
 * @route  GET /api/product/create?id=<"Selected product Id">&type=single
 * @access public
 */
exports.getProductsByID = async (req, res) => {
  //id
  let productID = req.query.id;
  try {
    const product = await Product.find({ _id: { $in: productID } });
    if (!product) throw Error("PRODUCT_NOT_FOUND");

    res.status(200).json({ success: true, product });
  } catch (err) {
    rse.status(400).json({
      success: false,
      error: err.message,
    });
  }

  res.end("hi");
};
//Update Product (by ID)
//Remove Product
