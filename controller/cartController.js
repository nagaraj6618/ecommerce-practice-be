const { verifyToken } = require("../middleware/authMiddleware");
const CartModel = require("../model/CartModel");

async function getAllCart(req,res) {
   try{
      const user = verifyToken(req.headers.authorization);
      if(!user){
         return res.status(401).json({
            message:"Please login..",
            success:false,
         });
      }

      const cartProduct = await CartModel.find({userId:user.id});

      res.status(200).json({
         message:"Retrived all the products in the cart..",
         success:true,
         data:cartProduct
      });

   }
   catch(error){
      res.status(500).json({
         message:error.message,
         success:false
         }
      );
   }
};




async function addProductToCart(req,res) {
   try{
      // const {}
      const user = verifyToken(req.headers.authorization);
      const {productId} = req.body.product;

      if(!user){
         return res.status(401).json({
            message:'Please Login..',
            success:false,
         })
      }
      const newCartProduct = await CartModel({
         userId:user.id,
         productId:productId,
      })

      // console.log(newCartProduct)
      await newCartProduct.save();
      res.status(201).json({
         message:"Added product to the cart..",
         success:true,
         data:newCartProduct
      });

   }
   catch(error){
      res.status(500).json({
         message:error.message,
         success:false
      })
   }
}

module.exports = {getAllCart,addProductToCart};