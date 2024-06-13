const prisma = require('../models/index')

const userService = {};

userService.createUser = data => prisma.users.create({data});
userService.findUserByUsername = username =>
    prisma.users.findMany({
        where: {
            OR: [{userName: username},{ email:email}]
        }
    })

    userService.findUserById = username =>
        prisma.users.findUnique({
            where: {
              userName : username,
            },
          });

module.exports = userService;