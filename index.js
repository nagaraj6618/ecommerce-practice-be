const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URL;


const app = express();
// Route
const productRoute = require('./route/productRoute');
const authRoute = require('./route/authRoute');
const uploadRoute = require('./route/uploadRoute');
const cartRoute = require('./route/cartRoute');

async function dbConnection() {
   if(!DB_URL){
      console.log("Provide DB API");
      process.exit(1);
   }
   try{
      const DBResponse = await mongoose.connect(DB_URL);
      console.log("DB Connected",DBResponse.connection.host);
   }
   catch(error){
      console.error("DB Connection Error:", error.message);
      // console.log(error);
   }
}

dbConnection();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:true,credentials:true}));


app.get('/api/v1/',(req,res) => {
   res.status(200).json({

      message:"Server Working",
      success:true,
   });

})

app.use('/api/v1/product',productRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/upload',uploadRoute);
app.use('/api/v1/cart',cartRoute);


app.listen(PORT,()=> console.log("Server running.."))


