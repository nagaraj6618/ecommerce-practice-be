const express = require('express');
const { 
   getAllProducts, 
   getProductByID, 
   addNewProduct, 
   updateProductById, 
   deleteEntireProduct, 
   deleteProductById, 
} = require('../controller/productController');
const { validateIDFormat } = require('../middleware/validateID');
// const multerUpload = require('../middleware/multer');
// const { verifyValidUser, verifyUser, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',getAllProducts);
router.post('/',addNewProduct);
router.delete('/',deleteEntireProduct);

router.get('/:id',validateIDFormat,getProductByID);
router.put('/:id',validateIDFormat,updateProductById);
router.delete('/:id',validateIDFormat,deleteProductById);


module.exports  = router;