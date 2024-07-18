const express = require('express');
const { register, login, verifyOTP } = require('../controller/authController');

const router = express.Router();


router.post('/signup',register);
router.post('/signin',login);
router.post('/otp/:id',verifyOTP);


module.exports = router;