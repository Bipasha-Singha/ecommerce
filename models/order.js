const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  /*razorpayOrderId: {
    type: String,
    required: true,
  },*/
  user: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address:{
    type:String,
    required: true,
  },
  product:{type:[String], required:true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
