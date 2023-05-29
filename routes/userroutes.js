const express = require('express');
const User = require('../models/usermodel');
//const { getAllProducts, getProductById} = require('../controllers/productcontroller');
const { getAllUsers, getUserById, loginuser, userLogout,forgotpassword, googleLogin, RegisterUser} = require('../controllers/usercontrollers');
//const {isauthenticatedUser, authorizedRoles}= require("../middlewares/auth");
const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUserById);
//router.route("/register").post(registeruser);
router.route("/register-user").post(RegisterUser);
router.route("/login").post(loginuser);
router.route("/logout").post(userLogout);
router.route("/forgot-password").post(forgotpassword);
router.route('/google-login').post(googleLogin);
//router.route('/update-profile').post(updateProfile);
// Route to view user image
router.get('/user/:userId/image', async (req, res) => {
    try {
      // Find the user by their ID
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the user has a profile image
      if (!user.profile.data || !user.profile.contentType) {
        return res.status(404).json({ error: 'Profile image not found' });
      }
  
      // Set the response content type based on the image contentType
      res.set('Content-Type', user.profile.contentType);
  
      // Send the image data
      res.send(user.profile.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;