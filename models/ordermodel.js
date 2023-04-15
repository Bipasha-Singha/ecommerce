const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippinginfo:{
    address:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true},
    country:{type:String, required:true},
    pincode:{type:Number, required:true},
    phoneno:{type:String, required:true},
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  orderedproducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
      },
      quantity: {
        type: Number,
        required: true
      },
      Image:{
        type:String, 
        required:true
      },
      price:{
        type:Number,
        required:true
      },

    }
  ],
paymentInfo:{
  id:{
    type:String,
    required:true,
  },
  status:{type:String, required:true},
},
  paidat:{type:String, required:true},
  itemsPrice:{type:Number, required:true},
  taxprice:{type:Number, required:true},
  shippingprice:{type:Number, required:true},
  totalprice:{type:Number, required:true},
  orderStatus:{type:String, required:true, default:"Processing"},
  deliveredAt:Date,
  createdat:{type:Date, default: Date.now},
});

module.exports = mongoose.model('order', orderSchema);
