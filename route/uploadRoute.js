const express = require("express");
const multerUpload = require("../middleware/multer");
const uploadImage = require("../controller/uploadController");

const router = express.Router();


router.post('/',multerUpload.single("image"),uploadImage)
module.exports = router;