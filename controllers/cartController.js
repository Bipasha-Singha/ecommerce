const Cart = require('../models/cart');
const User = require('../models/usermodel');
const Product = require('../models/productmodel');

const addToCart = async (req, res) => {
  try{
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).send({ success: false, msg: "Please login to access this resource" });
    }
     // Find the product and update its quantity in the Product collection
     const product = await Product.findById(req.body.product);
     product.quantity -= req.body.quantity;
     await product.save();

    const cart_obj = new Cart({
      product: req.body.product,
      quantity: req.body.quantity,
      user: req.user._id // Set the user ID to the current authenticated user
    });
    const cartData = await cart_obj.save();

    res.status(200).send({success:true, msg:"Cart Product Details", data:cartData});
  }catch (error){
    res.status(400).send({success:false, msg: error.message});
  }
}
module.exports = { addToCart };
