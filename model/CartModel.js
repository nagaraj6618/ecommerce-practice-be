const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users',
      required:true,
   },
   productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'products',
      required:true
   },
   count:{
      type:Number,
      default:1,
      required:true
   }
   },{
      timestamps:true
   }

);


module.exports = mongoose.model('cart',cartSchema);