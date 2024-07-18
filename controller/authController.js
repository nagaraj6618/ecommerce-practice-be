const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req,res){
   try{

      const {userName,name,email,password} = req.body.user;
      if(!userName || !name|| !email || !password){
         return res.status(400).json({
            message:"Provide all the details..",
            success:false,
         })
      };
      const isExistingUser = await userModel.findOne({
         $or:[
            {userName:userName.trim()},
            {email:email.trim()}
      ]
      })
      if(isExistingUser){
         return res.status(409).json({
            message:"User account already registered..",
            success:false,
         })
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword =  bcrypt.hashSync(password.trim(),salt)

      const addUser = await userModel({
         name:name.trim(),
         userName:userName.trim(),
         password:hashPassword,
         email:email.trim(),
      });
   
      await addUser.save();
      res.status(201).json({
         message:"User account created..",
         success:true,
         data:addUser
      })
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         success:false
      })
   }
}

async function login(req,res){
   try{

      const {userNameOrEmail,password} = req.body.user;

      if(!userNameOrEmail|| !password){
         return res.status(400).json({
            message:"Provide neccessary details..",
            success:false,
         });
      };

      const userExist = await userModel.findOne({
         $or:[
            {userName:userNameOrEmail.trim()},
            {email:userNameOrEmail.trim()},
         ]
      });

      if(!userExist){
         return res.status(400).json({
            message:"User doesn't exist",
            success:false,
         });
      };

      const isvalidPassword = bcrypt.compareSync(password.trim(),userExist.password);
      if(!isvalidPassword){
         return res.status(401).json({
            message:"Wrong password..",
            success:false,
         });
      };

      const token = await jwt.sign(
         {
            id:userExist._id,
            role:userExist.role,
         },
         process.env.JWTKEY,
         {
            expiresIn:'1h'
         }
      );


      res.status(200).json({
         message:"Login Successfull..",
         success:true,
         data:{token}
      })
   }
   catch(error){
      res.status(500).json({
         message:error.message,
         success:false
      })
   }
}

module.exports = {register,login}