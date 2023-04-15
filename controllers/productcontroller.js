const Product = require('../models/productmodel');

//Create products
/*exports.createProduct = async(req,res,next)=>{
    const product = await product.create(req.body);
     return res.status(201).json({
        success:true,
        product
    })
};*/
//get all products
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
//module.exports = { getAllProducts, getAllProductsTesting};