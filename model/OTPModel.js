const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({

   otp:{
      type:String,
      required:true,
   },
   userId:{
      type:String,
      required:true,
   },
   createdAt:Date,
   expiresAt:Date,
   
}
);

module.exports = mongoose.model('OTP',OTPSchema);
