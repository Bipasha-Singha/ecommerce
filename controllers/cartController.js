const Cart = require('../models/cart');
const User = require('../models/usermodel');
const Product = require('../models/productmodel');
const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the product and update its quantity in the Product collection
    const product = await Product.findById(req.body.product);

    if (!product) {
      return res.status(400).send({ success: false, msg: "Product not found" });
    }

   const desiredQuantity = req.body.quantity;
    if (product.quantity < desiredQuantity) {
      return res.status(422).send({ success: false, msg: `Only ${product.quantity} item(s) available` });
    }

    product.quantity -= desiredQuantity;
    if (product.quantity < 1) {
      return res.status(400).send({ success: false, msg: "Product is out of stock" });
    }
    
    await product.save();

    // Get the price of the product
    const price = product.price * desiredQuantity;

    const cart_obj = new Cart({
      product: req.body.product,
      quantity: desiredQuantity,
      price: price,
      user: userId 
    });

    const cartData = await cart_obj.save();

    res.status(200).send({success:true, msg:"Cart Product Details", data:cartData});
  } catch (error) {
    res.status(400).send({success:false, msg: error.message});
  }
}
const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the cart items for the specified user
    const cartItems = await Cart.find({ user: userId }).populate('product');

    res.status(200).send({ success: true, msg: "Cart items retrieved", data: cartItems });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}
module.exports = { addToCart, getCartItems };
