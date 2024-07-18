const express = require('express');
const { 
   getAllProducts, 
   getProductByID, 
   addNewProduct, 
   updateProductById, 
   deleteEntireProduct, 
   deleteProductById 
} = require('../controller/productController');

const router = express.Router();

router.get('/',getAllProducts);
router.post('/',addNewProduct);
router.delete('/',deleteEntireProduct);

router.get('/:id',getProductByID);
router.put('/:id',updateProductById);
router.delete('/:id',deleteProductById);


module.exports  = router;