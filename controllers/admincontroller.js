// Import required packages
const User = require('../models/usermodel');
const Product = require('../models/productmodel');
const Admin = require('../models/adminmodels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// Admin login
exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password were provided
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password', 400));
  }

  // Find user by email
  const user = await User.findOne({ email }).select('+password');

  // Check if user exists and password is correct
  if (!user || !(await user.comparePassword(password)) || user.role !== 'admin') {
    return next(new ErrorHandler('YOU DONOT HAVE ADMIN PRIVILEDGES', 402));
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({
    success: true,
    message: 'Welcome admin!',
    token,
  });
});
//Admin Logout
exports.adminLogout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Admin logged out successfully'
  });
};
// Define controller methods
exports.getAllUsers = async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User is not present' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
exports.getAllProducts = async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product is not available' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
exports.createProduct = async (req, res) => {
    try{
        const{ name, description, price, quantity, image, shipping} = req.body;
        const product = new Product({ name, description, price, quantity, image, shipping });
        await product.save();
        res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, image, shipping } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product is not available' });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.image = image;
        product.shipping= shipping;
        await product.save();
        res.json(product);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product is not available' });
        }
        await product.remove();
        res.json({ message: 'Product deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

// Export admin controller
//module.exports = adminController;
