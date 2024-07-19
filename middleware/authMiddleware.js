const jwt = require('jsonwebtoken');


 function verifyToken(token){
   let reqUser = null;

   if(!token){
      return null;
   }
   const accessToken = token.split(`Bearer`)[1].trim();

   jwt.verify(accessToken,process.env.JWTKEY,function(err,user) {

      if(err) return null;

      reqUser =  user;
   })
  return reqUser;
};

async function verifyAdmin (req,res,next){
   const token = req.headers.authorization;
   const user = verifyToken(token);
   
   if(!user || user.role !== "admin"){
      return res.status(401).json({
         message:"You are not authorized..",
         success:false,
      });
   };
   next();
};

async function verifyUser (req,res,next){
   const token = req.headers.authorization;
   const user = verifyToken(token);
  
   if(!user || user.role !== "user"){
      return res.status(401).json({
         message:"You are not authorized..",
         success:false,
      });
   };
   next();
};

async function verifyValidUser(req,res,next){

   const token = req.headers.authorization;
   const user = verifyToken(token);
   console.log(token)
   console.log(user);
   if(!user){
      return res.status(401).json({
         message:"You are not user..",
         success:false,
      });
   };
   next();
}

module.exports = {verifyToken,verifyAdmin,verifyUser,verifyValidUser};