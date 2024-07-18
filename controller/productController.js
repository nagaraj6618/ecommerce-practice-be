
const product = require('../model/productModel');

async function getAllProducts (req,res){
   try{
      // console.log()
      res.status(200).json({
         message:"Get All products..",
         success:true,
         data:[]
      });
   }
   catch(error){

      res.status(500).json({
         message:error.message,
         success:false,
      })
   }
}

module.exports = {getAllProducts}