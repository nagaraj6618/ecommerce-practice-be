const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URL;

const app = express();


(async function dbConnection() {
   try{
      const DBResponse = await mongoose.connect(DB_URL);
      console.log("DB Connected");
   }
   catch(error){

      console.log(error);
   }
})();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:true,credentials:true}));


app.get('/api/v1/',(req,res) => {
   res.status(200).json({

      message:"Server Working",
      success:true,
   });
   
})


app.listen(PORT,()=> console.log("Server running.."))


