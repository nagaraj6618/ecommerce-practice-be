const express = require('express');
const { getAllCart, addProductToCart } = require('../controller/cartController');
const router = express.Router();


router.get('/',getAllCart);
router.post('/',addProductToCart);
module.exports = router;