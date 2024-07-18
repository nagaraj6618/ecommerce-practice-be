
const productModel = require('../model/productModel');
// const mongoose = require('mongoose');





async function getAllProducts(req, res) {
   try {
     

      const allProductData = await productModel.find();
      if (allProductData.length <= 0) {
         return res.status(404).json({
            message: "No products available..",
            success: false,
         })
      }
      res.status(200).json({
         message: "Get All products..",
         success: true,
         data: allProductData
      });
   }
   catch (error) {

      res.status(500).json({
         message: error.message,
         success: false,
      })
   }
}



async function getProductByID(req, res) {
   const id = req.params.id;

   try {
      const productData = await productModel.findById(id);

      if (!productData) {
         return res.status(404).json({
            message: "Product Not available",
            success: false,
         })
      }

      res.status(200).json({
         message: "Retrived product using ID",
         data: productData,
         success: true
      })
   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         success: false,
      })
   }

}

async function addNewProduct(req, res) {
   try {
      const { name, description, quantity, price, category } = req.body;

      if (!name || !description || !quantity || !price || !category) {
         return res.status(400).json({
            message: "Provide all the details",
            success: false,
         });
      }

      const newProduct = await productModel({
         name: name.trim(),
         description: description.trim(),
         quantity: Number(quantity.trim()),
         price: Number(price.trim()),
         category: category,
      });

      // console.log(newProduct);
      await newProduct.save();
      res.status(201).json({
         message: "Product Added Successfully..",
         succes: true,
         data: newProduct
      })
   }
   catch (error) {
      res.status(500).json({
         message: error.message,
         success: false,
      })
   }
};

async function updateProductById(req, res) {
   const id = req.params.id;



   try {
      const updateProductdata = req.body.product;
      if(!updateProductdata){
         return res.status(400).json({
            message:"Provide details to update the product..",
            success:false,
         })
      }

      const updated = await productModel.findByIdAndUpdate(id,updateProductdata);
      if(!updated){
         return res.status(404).json({
            message:"Product Not Found..",
            success:false,
         });
      };

      const getProductData = await productModel.findById(updated._id);

      res.status(200).json({
         message:"Updated Successfully..",
         success:true,
         data:getProductData
      })
   }
   catch (error) {
      res.status(500).json({
         message:error.message,
         success:false,
      })
   }
};

async function deleteProductById(req, res) {
   const id = req.params.id;

   try {
      const deleteProduct = await productModel.findByIdAndDelete(id);
      
      if(!deleteProduct){
         return res.status(404).json({
            message:"Product Not Found...",
            success:false,
         })
      }
      res.status(200).json({
         message:"Product Deleted...",
         success:true,
         data:deleteProduct
      });

   }
   catch (error) {
      res.status(500).json({
         message:error.message,
         success:false,
      })
   }
};

async function deleteEntireProduct(req, res) {
   try {

   }
   catch (error) {

   }
}

module.exports = {
   getAllProducts,
   getProductByID,
   addNewProduct,
   updateProductById,
   deleteProductById,
   deleteEntireProduct,
  
};


