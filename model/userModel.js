const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true,
      trim:true,
   },
   userName:{
      type:String,
      unique:true,
      required:true,
      trim:true,
   },
   email:{
      type:String,
      unique:true,
      required:true,
      trim:true,
   },
   password:{
      type:String,
      required:true
   },
   role:{
      type:String,
      enum:['admin','user'],
      default:'admin',
      required:true,
   },
   verified:{
      type:Boolean,
      default:false,
      required:true,
   }
},{
   timestamps:true,
});


module.exports = mongoose.model('user',userSchema);