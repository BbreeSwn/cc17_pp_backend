const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//todo register
const register = tryCatch(async (req, res, next) => {
  // รับ body จาก users
  const { userName, password, confirmPassword, email } = req.body;

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
    throw createError("user already exist", 400);
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
const login = tryCatch(async (req, res, next) => {
  //* รับbody
  const { userName, password } = req.body;

  //* validation
  if (!(userName && password)) {
    throw createError("all input", 400);
  }

  //* หาว่ามี user ในระบบไหม
  const targetUser = await prisma.users.findUnique({
    where: {
      userName,
    },
  });
  if (!targetUser) {
    throw createError("user not found", 400);
  }
  //* check validation password ว่า ok ไหม ถ้าไม่ ok ให้ throw error ถ้า ok ก็ successfuly
  const passwordOk = await bcrypt.compare(password, targetUser.password);
  if (!passwordOk) {
    throw createError("password not match", 400);
  }
  // create jwt token => patload = {id} , secret , {expiresIn}
  const payload = { id: targetUser.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20d" });
  console.log(token);
  res.json({ token : token});
  //   console.log(req.body);  // ลองยิงดูว่า  body เข้าไหม
});

//todo logout
const logout = tryCatch(async (req, res) => {
  (req, res, next) => {
    res.json({ msg: "this is register" });
    //   console.log(req.body);  // ลองยิงดูว่า  body เข้าไหม
  };
});

module.exports = { register, login, logout };
