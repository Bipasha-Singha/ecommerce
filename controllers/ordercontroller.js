const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//create new order
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
    const {
        shippinginfo,
        orderedproducts,
        paymentInfo,
        itemsPrice,
        taxprice,
        shippingprice,
        totalprice,
    } = req.body;
    const order = await Order.create({
        shippinginfo,
        orderedproducts,
        paymentInfo,
        itemsPrice,
        taxprice,
        shippingprice,
        totalprice,
        paidat: Date.now(),
        user: req.user._id, 
    });
    res.status(201).json({
        success:true,
        order,
    });
});