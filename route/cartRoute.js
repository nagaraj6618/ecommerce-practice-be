const express = require('express');
const { getAllCart, addProductToCart, getCartProductById } = require('../controller/cartController');
const { validateIDFormat } = require('../middleware/validateID');
const router = express.Router();


router.get('/',getAllCart);
router.post('/',addProductToCart);

router.get('/:id',validateIDFormat,getCartProductById);

module.exports = router;