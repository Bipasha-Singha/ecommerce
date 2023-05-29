//const mongoose = require('mongoose');

/*const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user' // Assuming you have a 'User' model defined
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product' // Assuming you have a 'Product' model defined
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);*/
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true
      }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);


