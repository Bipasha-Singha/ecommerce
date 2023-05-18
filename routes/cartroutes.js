const express = require("express");
const Cart = require('../models/cart');
const { addToCart, getCartItems, removeCartItem } = require("../controllers/cartController");
//const { isauthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/cart/:userId").post(addToCart);
router.route("/cart/:userId").get(getCartItems);
router.route("/cart/:userId/:cartItemId").delete(removeCartItem);
module.exports = router;
