const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//todo register
const register = tryCatch(async (req, res, next) => {
  // รับ body จาก users
  const { userName, password, confirmPassword, email } = req.body;
console.log("body check",req.body)
  //* validation
  //! ถ้าไม่มี username , password ,confirmpassword , email
  if (!(userName && password && confirmPassword && email)) {
    return next(createError("fail all input", 400));
  }
  //* ถ้า password !== confirmPassword
  if (password !== confirmPassword) {
    throw createError("password not match", 400);
  }
  //* hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const data = {
    userName,
    password: hashPassword,
    email,
  };

  //* ดัก user ซ้ำ ถ้ามี username ให้ throw error
  const userExist = await prisma.users.findUnique({
    where: {
      userName,
    },
  });
  console.log(userExist);

  if (userExist) {
    throw createError({message: "username already in use" , field: "userName" , statusCode: 400 });
  }
  //* สร้าง user
  const rs = await prisma.users.create({
    data: data,
  });
  console.log(rs);

  res.json({ msg: "register successfuly" });
  console.log(req.body); // ลองยิงดูว่า  body เข้าไหม
});

//todo login
const login = async (req, res, next) => {
  //* รับbody
  console.log(req.body)
  const { username, password } = req.body;
  try{

      //* validation
      if (!(username && password)) {
        throw createError({message: "fail all input" , field: "username" , statusCode: 400 });
      }
    
      //* หาว่ามี user ในระบบไหม
      const targetUser = await prisma.users.findUnique({
        where: {
          userName : username,
        },
      });
      if (!targetUser) {
        throw createError({message: "user not found" , field: "username" , statusCode: 400 });
      }
      //* check validation password ว่า ok ไหม ถ้าไม่ ok ให้ throw error ถ้า ok ก็ successfuly
      const passwordOk = await bcrypt.compare(password, targetUser.password);
      if (!passwordOk) {
        throw createError({message: "password not natch" , field: "username" , statusCode: 400 });
      }
      // create jwt token => patload = {id} , secret , {expiresIn}
      const payload = { id: targetUser.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20d" });
      console.log(token);
      res.json({ token : token});
      //   console.log(req.body);  // ลองยิงดูว่า  body เข้าไหม
    
  }catch (err){
   console.log(err)
    next()
  }
};

//todo login-admin
const loginAdmin = async (req, res, next) => {
  //* รับbody

  try{
    const { username, password } = req.body;

      //* validation
      if (!(username && password)) {
        throw createError({message: "fail all input" , field: "username" , statusCode: 400 });
      }
    
      //* หาว่ามี user ในระบบไหม
      const targetUser = await prisma.admin.findUnique({
        where: {
          userName : username,
        },
      });
      if (!targetUser) {
        throw createError({message: "user not found" , field: "username" , statusCode: 400 });
      }
      //* check validation password ว่า ok ไหม ถ้าไม่ ok ให้ throw error ถ้า ok ก็ successfuly
      const passwordOk = await bcrypt.compare(password, targetUser.password);
      if (!passwordOk) {
        throw createError({message: "password not natch" , field: "username" , statusCode: 400 });
      }
      // create jwt token => patload = {id} , secret , {expiresIn}
      const payload = { id: targetUser.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20d" });
      console.log(token);
      res.json({ token : token});
      //   console.log(req.body);  // ลองยิงดูว่า  body เข้าไหม
    
  }catch (err){
    next(err)
  }
};



//todo 
const me = tryCatch(async (req, res , next) => {
  console.log(req.body)
    res.status(200).json({user : req.users });
    //   console.log(req.body);  // ลองยิงดูว่า  body เข้าไหม

});



const logout = tryCatch(async (req , res ,next) => {
  res.json({ msg: "this is logout" });
})

module.exports = { register, login, me , logout , loginAdmin };
