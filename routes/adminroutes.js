const express = require('express');
//const { checkAdmin } = require('../middlewares/adminmiddleware');
const router = express.Router();
const {adminLogin, adminLogout,getAdminProfile} = require('../controllers/admincontroller');
const { isauthenticatedUser, authorizedRoles } = require('../middlewares/auth');
/*router.get('/admin', checkAdmin, (req, res) => {
  // this route can only be accessed by administrators
  res.send('Admin page');
});*/
router.route("/admin/login").post(adminLogin);
router.route("/admin/logout").post(adminLogout);
//router.route("/admin/users").get(getAllUsers);
//router.route("/admin/users/:id").get(getUserById);
//router.route("/admin/products").get(getAllProducts);
//router.route("/admin/products/:id").get(getProductById).put(updateProduct).delete(deleteProduct);
//router.route("/admin/createproducts").post(createProduct);
router.route("/admin/profile").get(isauthenticatedUser,authorizedRoles("admin"), getAdminProfile);
module.exports = router;
