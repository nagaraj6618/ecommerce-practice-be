const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URL;

const app = express();
const productRoute = require('./route/productRoute');

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

app.listen(PORT,()=> console.log("Server running.."))


