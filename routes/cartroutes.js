const express = require("express");
const{addToCart}= require("../controllers/cartController");
const { isauthenticatedUser} = require("../middlewares/auth");
const router = express.Router();
//const(isauthenticatedUser)= require("../middlewares/auth");

router.route("/cart/new").post(isauthenticatedUser, addToCart);

module.exports = router;