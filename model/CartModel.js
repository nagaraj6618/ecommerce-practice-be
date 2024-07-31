const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   userId:{
      type:String,
      required:true,
   },
   productId:{
      type:String,
      required:true
   },
   count:{
      type:Number,
      default:0,
      required:true
   }
});


module.exports = mongoose.model('cart',cartSchema);