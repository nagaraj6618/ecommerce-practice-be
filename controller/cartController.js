const { verifyToken } = require("../middleware/authMiddleware");
const CartModel = require("../model/CartModel");
const productModel = require("../model/productModel");

async function getAllCart(req, res) {
   try {
      const user = verifyToken(req.headers.authorization);
      if (!user) {
         return res.status(401).json({
            message: "Please login..",
            success: false,
         });
      }

      const cartProduct = await CartModel.find({ userId: user.id });
      const productDatas = await Promise.all(cartProduct.map(async (cartData) => {
         const product = await productModel.findById(cartData.productId);
         const singleCartData = { cartData, productData:product };
         return singleCartData;
      }));

     


      res.status(200).json({
         message: "Retrived all the products in the cart..",
         success: true,
         data:  productDatas
      });

   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         success: false
      }
      );
   }
};




async function addProductToCart(req, res) {
   try {
      
      const user = verifyToken(req.headers.authorization);
      const { productId } = req.body.product;

      if (!user) {
         return res.status(401).json({
            message: 'Please Login..',
            success: false,
         })
      }

      const isProductExist = await productModel.find(
         { _id: productId }
      );

      if (isProductExist.length <= 0) {
         return res.status(404).json({
            message: "Product not found.",
            status: false
         });
      };


      const isAlreadyExistProduct = await CartModel.find({
         userId: user.id, productId: productId
      })
      // console.log(isAlreadyExistProduct)
      if (isAlreadyExistProduct.length > 0) {

         const existProduct = isAlreadyExistProduct[0]
         const existProductId = existProduct._id;
         // console.log(existProductId);
         await CartModel.findByIdAndUpdate(existProductId, {
            count: existProduct.count + 1
         })

         return res.status(200).json({
            message: "Product count updated",
            success: true
         });
      }


      // console.log(isProductExist);



      const newCartProduct = await CartModel({
         userId: user.id,
         productId: productId,
      })

      // console.log(newCartProduct)
      await newCartProduct.save();
      res.status(201).json({
         message: "Added product to the cart..",
         success: true,
      });

   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         success: false
      })
   }
}

async function getCartProductById(req, res) {
   try {
      const { id } = req.params;
      const cartProduct = await CartModel.findById(id);
      const product = await productModel.findById(cartProduct.productId);
      res.status(200).json({
         message: "Retrived product data by ID",
         success: true,
         data: {cartData:cartProduct,productData:product}
      });

   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         success: false,
      })
   }
}

module.exports = { getAllCart, addProductToCart, getCartProductById };