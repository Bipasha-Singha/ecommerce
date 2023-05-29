const Wishlist = require('../models/wishlist');
const Product = require('../models/productmodel');
// Add an item to the wishlist
/*const addItemToWishlist = async (req, res) => {
    const { user, product, price } = req.body;
  
    try {
      const existingWishlistItem = await Wishlist.findOne({ user, product });
  
      if (existingWishlistItem) {
        return res.status(409).json({ error: 'Item already exists in the wishlist' });
      }
  
      const newWishlistItem = new Wishlist({
        user,
        product,
        price
      });
  
      const savedItem = await newWishlistItem.save();
  
      res.status(201).json(savedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add item to wishlist' });
    }
  };
  */
  const addItemToWishlist = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      //const productId = req.body.productId;
      const price = req.body.price;
  
      // Find the product
      const product = await Product.findById(req.body.product);
  
      if (!product) {
        return res.status(400).send({ success: false, msg: "Product not found" });
      }
      const existingWishlistItem = await Wishlist.findOne({ user: userId, product: product });

     if (existingWishlistItem) {
      return res.status(409).json({ error: 'Item already exists in the wishlist' });
      }
      const wishlistItem = new Wishlist({
        user: userId,
        product: req.body.product,
        price: price
      });
  
      const savedItem = await wishlistItem.save();
      
      const updatedProduct = await Product.findByIdAndUpdate(
        product,
        { isInWishlist: true },
        { new: true }
      );

      res.status(200).send({ success: true, msg: "Item added to wishlist", data: savedItem });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  };
  
// Remove an item from the wishlist
const removeItemFromWishlist = async (req, res) => {
  const { wishlistItemId } = req.params;

  try {
    await Wishlist.findByIdAndRemove(wishlistItemId);

    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove item from wishlist' });
  }
};

// Get wishlist items for a user
const getWishlistItemsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlistItems = await Wishlist.find({ user: userId })
      .populate('user', 'username') // Assuming you want to populate the 'user' field with the username
      .populate('product', 'name'); // Assuming you want to populate the 'product' field with the product name

    // Add the 'isInWishlist' property to each wishlist item
    const updatedWishlistItems = wishlistItems.map((item) => ({
      ...item.toObject(),
      isInWishlist: true
    }));

    res.status(200).json(updatedWishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch wishlist items' });
  }
};

module.exports = {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistItemsByUser
};
