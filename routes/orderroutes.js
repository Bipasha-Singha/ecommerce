const express = require("express");
const{newOrder}= require("../controllers/ordercontroller");
const { isauthenticatedUser} = require("../middlewares/auth");
const router = express.Router();
//const(isauthenticatedUser)= require("../middlewares/auth");

router.route("/order/new").post(isauthenticatedUser, newOrder);

module.exports = router;