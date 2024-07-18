const mongoose = require('mongoose')

async function validateIDFormat (req,res,next){
   const id = req.params.id;
   
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(401).json({
         message: "Invalid product ID format",
         success: false,
      });
   }
   next();

}
module.exports = {validateIDFormat}