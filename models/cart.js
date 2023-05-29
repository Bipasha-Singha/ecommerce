const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
      },
    quantity:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
      }
});

module.exports = mongoose.model('Cart', cartSchema);
