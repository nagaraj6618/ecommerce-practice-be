const cloudinary = require('cloudinary');
const path = require('path');
const DataUriParser = require('datauri/parser');

const parser = new DataUriParser();
const formatBufferTo64 = file => {
   return parser.format(
     path.extname(file.originalname).toString(),
     file.buffer
   );
 };

 cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY
 });
 
async function uploadImage(req,res){
   try {
    console.log(req.file);
      if (!req.file) {
        throw new Error('No file uploaded.');
      }
      // console.log(req.file);
      const file64 = formatBufferTo64(req.file);
  
  
      const originalName = path.parse(req.file.originalname).name;
    
  
      const cldRes = await cloudinary.v2.uploader.unsigned_upload(file64.content, 'hlwb0d2s', {
        public_id: originalName,
        folder: 'Image',
        resource_type: 'auto'
      });
  
      res.status(201).json({
        cldRes,
        message: "Uploaded.",
        success: true
      });
    } catch (error) {
      console.error('Error during upload:', error);
      res.status(500).json({
        message: "Upload was not successful.",
        success: false,
        error: error
      });
    }
}

module.exports = uploadImage;