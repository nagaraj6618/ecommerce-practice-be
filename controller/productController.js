
const productModel = require('../model/productModel');

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



async function getProductByID(req ,res){
   const id = req.params.id;
   // if()
   try{

   }
   catch(error){

   }

}

async function addNewProduct(req,res) {
   try{
      const {name,description,quantity,price,category} = req.body;

      if(!name || !description || !quantity || !price || !category){
         return res.status(400).json({
            message:"Provide all the details",
            success:false,
         });
      }

      const newProduct = await productModel({
         name:name.trim(),
         description:description.trim(),
         quantity:Number(quantity.trim()),
         price:Number(price.trim()),
         category:category,
      });

      // console.log(newProduct);
      await newProduct.save();
      res.status(201).json({
         message:"Product Added Successfully..",
         succes:true,
         data:newProduct
      })
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         success:false,
      })
   }
};

async function updateProductById (req,res) {
   try{

   }
   catch(error){

   }
};

async function deleteProductById(req,res) {
   try{

   }
   catch(error){

   }
};

async function deleteEntireProduct(req,res){
   try{

   }
   catch(error){

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


