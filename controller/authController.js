const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const OTPModel = require('../model/OTPModel');

const salt = bcrypt.genSaltSync(10);

const transporter = nodeMailer.createTransport({
   service:'Gmail',
   auth: {
      user: 'nagaraj516700@gmail.com',
      pass: 'bgxm fbbf gofe rlbp'
   }
});

async function sendOTP({email,id},res){
   try{

      const otp = `${Math.floor(1000+Math.random()*9000)}`;

      const otpMailOption = {
         from: `nagaraj516700@gmail.com`,
         to: email,
         subject: "Your OTP Code for Verification",
         html: `
             <p>Dear User,</p>
             <p>Thank you for registering.</p>
             <p>Your OTP code for verification is:</p>
             <h2>${otp}</h2>
             <p>Please enter this code to complete your verification process. The code is valid for 10 minutes.</p>
             <p>If you did not request this code, please ignore this email.</p>
             <p>Best regards,<br>Ecommerce</p>
         `
      }
      const hashOtp = bcrypt.hashSync(otp,salt);
      const newOTP = await OTPModel({
         otp:hashOtp,
         userId:id,
         createdAt:Date.now(),
         expiresAt:new Date(Date.now() + 10 *60*1000),
      });
      console.log(newOTP);

      await newOTP.save();
      await transporter.sendMail(otpMailOption,function(error,info){
         if(error){
            return res.status(500).json({
               message:error,
               success:false
            })
         }
         console.log(info.response);
         res.status(201).json({
            message:"Otp sent successfully..",
            success:true,
            data:{id,email}
         })
      })
   }catch(error){
      res.status(500).json({
         message:error.message,
         success:false,
      });
   }
}
async function verifyOTP (req,res){

   try{
      const id = req.params.id;
      const otp = req.body.otp.trim();

      const userOTPData = await OTPModel.find({userId:id});
      if(userOTPData.length<=0){
         return res.status(404).json({
            message:"OTP doesn't exist..",
            success:false,
         })
      };

      const {expiresAt} = userOTPData[0];
      if(expiresAt<Date.now()){
         await OTPModel.deleteMany({userId:id});
         return res.status(400).json({
            message:"OTP time expired..",
            success:false
         })
      };

      const hashOtp = userOTPData[0].otp;

      const isValidOTP = bcrypt.compareSync(otp,hashOtp);
      if(!isValidOTP){
         return res.status(400).json({
            message:"OTP is not Valid..",
            success:false
         });
      };

      await userModel.updateOne({_id:id},{verified:true});
      await OTPModel.deleteMany({userId:id});

      res.status(200).json({
         message:"Account verified Successfully..",
         success:true,
      })


   }
   catch(error){
      res.status(500).json({
         message:error.message,
         success:false
      })
   }

}

async function register(req,res){
   try{

      const {userName,name,email,password} = req.body.user;
      const user = req.body.user;
      if(!userName || !name|| !email || !password){
         return res.status(400).json({
            message:"Provide all the details..",
            success:false,
            data:{userName,name,email,password,user}
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

      
      const hashPassword =  bcrypt.hashSync(password.trim(),salt)

      const addUser = await userModel({
         name:name.trim(),
         userName:userName.trim(),
         password:hashPassword,
         email:email.trim(),
      });
   
      await addUser.save();
      await sendOTP({id:addUser._id,email:addUser.email},res);
      // res.status(201).json({
      //    message:"User account created..",
      //    success:true,
      //    data:addUser
      // })
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

module.exports = {register,login,verifyOTP}