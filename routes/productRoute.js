const express = require('express');
const { getAllProducts, getProductById, createProduct, getProductsByCategory, getFilterBycategory} = require('../controllers/productcontroller');
const Product = require('../models/productmodel');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductById);
router.route("/create-products").post(createProduct);
//router.route("/admin/createproducts").post(createProduct);
router.get('/products/:id/image', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.set('Content-Type', product.image.contentType);
        res.send(product.image.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.route('/category/:categoryId/products').get(getProductsByCategory);
router.route('/categories/:categoryId/products').get(getFilterBycategory);
router.get('products/:Id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
// Add search route
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const products = await Product.find({ $text: { $search: searchQuery } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
