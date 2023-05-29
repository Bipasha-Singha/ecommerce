const productmodel = require('../models/productmodel');
const Product = require('../models/productmodel');
const category = require('../models/categoryModel');
//const order = require('../models/ordermodel');
const formidable = require('formidable');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
//Create products
exports.createProduct = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      throw new Error('Error parsing form data');
    }
    try {
      const { name, description, price, category, quantity, shipping } = fields;
      const product = new productmodel({ name, description, price, category, quantity, shipping });
      if (shipping) {
        product.shipping = shipping;
      }
      if (files.image) {
        const image = files.image;
        const imageData = fs.readFileSync(image.path);
        product.image.data = imageData;
        product.image.contentType = image.type;
      }
      await product.save();
      res.status(201).send({
        success: true,
        message: 'Product created successfully',
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product is not available' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProductsByCategory = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};
exports.getFilterBycategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryIds = categoryId.split(',').map(id => ObjectId(id));
    const products = await Product.find({ category: { $in: categoryIds } });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        throw new Error('Error parsing form data');
      }
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const updatedProduct = {
        name: fields.name || product.name,
        description: fields.description || product.description,
        price: fields.price || product.price,
        category: fields.category || product.category,
        quantity: fields.quantity || product.quantity,
        shipping: fields.shipping || product.shipping,
      };
      if (files.image) {
        const image = files.image;
        const imageData = fs.readFileSync(image.path);
        updatedProduct.image = {
          data: imageData,
          contentType: image.type,
        };
      }
      const updated = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
      res.json({
        success: true,
        message: 'Product updated successfully',
        product: updated,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({
      success: true,
      message: 'Product deleted successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//module.exports = { getAllProducts, getAllProductsTesting};