
const productModel = require('../model/productModel');
const mongoose = require('mongoose');

async function getAllProducts(req, res) {
   try {
      // console.log()

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
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
         message: "Invalid product ID format",
         success: false,
      });
   }
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

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
         message: "Invalid product ID format",
         success: false,
      });
   }


   try {
      const updateProductdata = req.body.product;

      const updated = await productModel.findByIdAndUpdate(id,updateProductdata);

      res.status(200).json({
         message:"Updated Successfully..",
         success:true,
         data:updated
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
   try {

   }
   catch (error) {

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
   deleteEntireProduct
};


