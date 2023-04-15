const express = require('express');
const { getAllProducts, getProductById} = require('../controllers/productcontroller');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductById);


module.exports = router;