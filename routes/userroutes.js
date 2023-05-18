const express = require('express');
//const { getAllProducts, getProductById} = require('../controllers/productcontroller');
const { getAllUsers, getUserById, registeruser, loginuser, userLogout } = require('../controllers/usercontrollers');
const {isauthenticatedUser, authorizedRoles}= require("../middlewares/auth");
const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUserById);
router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").post(userLogout);
module.exports = router;
