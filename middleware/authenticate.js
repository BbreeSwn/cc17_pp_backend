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
  //use payload find user in prisma.users
  const users = await prisma.users.findUnique({
    where: {
      id: payload.id,
    },
  });
  delete users.password;
  req.users = users;

  next();
});

// id
