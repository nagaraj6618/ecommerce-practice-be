const express = require('express');
const { getAllCart } = require('../controller/cartController');
const router = express.Router();


router.get('/',getAllCart);

module.exports = router;