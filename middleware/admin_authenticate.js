const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");
const jwt = require("jsonwebtoken");
const prisma = require("../models");

module.exports = tryCatch(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw createError("UnAuthorization", 401);
  }
  if (!authorization.startsWith("Bearer ")) {
    throw createError("UnAuthorization", 401);
  }
  const token = authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log("*********************",payload);
  //use payload find user in prisma.admin
  const admin = await prisma.admin.findUnique({
    where: {
      id: payload.id,
    },
  });
  delete admin.password;
  req.admin = admin;
  console.log(req.admin)

  
  next();
  });
  
//   const isSuperAdmin = async (req,res,next) => {
//       await isSuperAdmin(req,res,next);
  
//       if(!req.user.isSuperAdmin){
//       // Check if 'isSuperAdmin'
//       const isSuperHeaderAdmin = req.headers['You are super admin'];
//       if (!isSuperHeaderAdmin) {
//         return next(createError("Super admin is not allow" , 403))
//       }
//       //verify 
//       if(isSuperAdmin !== 'true'){
//           return next(createError("Super admin is not allow" , 403))
//       }
//       }
//   }