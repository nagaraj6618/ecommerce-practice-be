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
const { verifyValidUser, verifyUser, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',getAllProducts);
router.post('/',verifyAdmin,addNewProduct);
router.delete('/',verifyAdmin,deleteEntireProduct);

router.get('/:id',validateIDFormat,getProductByID);
router.put('/:id',validateIDFormat,verifyAdmin,updateProductById);
router.delete('/:id',validateIDFormat,verifyAdmin,deleteProductById);


module.exports  = router;