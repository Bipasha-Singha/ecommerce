const express = require("express");
const router = express.Router();
const {addItemToWishlist,getWishlistItemsByUser,removeItemFromWishlist} = require('../controllers/wishlistcontroller');

// Get wishlist items for a user
router.route("/wishlist/:userId").get(getWishlistItemsByUser);

// Add an item to the wishlist
//router.post('/wishlist', wishlistController.addItemToWishlist);
router.route("/wishlist/:userId").post(addItemToWishlist);
// Remove an item from the wishlist
//router.delete('/wishlist/:wishlistItemId', wishlistController.removeItemFromWishlist);
router.route("/wishlist/:wishlistItemId").delete(removeItemFromWishlist);
module.exports = router;
