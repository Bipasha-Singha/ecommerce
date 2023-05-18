const express = require('express');

const { isauthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const { createCategoryController, getAllCategoriesController, getAllCategories } = require('../controllers/categoryController');
const router = express.Router();
// Route that requires admin access
router.get('/admin-only', isauthenticatedUser, authorizedRoles('admin'), (req, res) => {
  res.send('This is an admin-only route');
});
router.route("/create-category").post(isauthenticatedUser, authorizedRoles("admin"), createCategoryController);
router.route("/getAllcategories").get(getAllCategoriesController);
router.route("/categories").get(getAllCategories);
module.exports = router;
