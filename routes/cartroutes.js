const express = require("express");
const Cart = require('../models/cart');
const { addToCart, getCartItems, removeCartItem, removeAllCartItems } = require("../controllers/cartController");
//const { isauthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/cart/:userId").post(addToCart).delete(removeAllCartItems);
router.route("/cart/:userId").get(getCartItems);
router.route("/cart/:userId/:cartItemId").delete(removeCartItem);
// DELETE route to remove items from the cart
/*router.delete('/cart/:userId', (req, res) => {
    
    // Perform the logic to remove items from the cart for the specified userId
    // This can involve deleting the corresponding cart items from your database
    
    // Instead of explicitly mentioning the items removed, you can send a payment success message
    res.json({ msg: 'Payment successful' });
  });*/
module.exports = router;
