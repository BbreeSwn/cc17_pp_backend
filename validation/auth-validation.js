const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  userName: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ])
    .required()
    .strip(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  //email: Joi.string().default(Joi.ref('emailOrMobile')).forbidden(), // .forbidden ห้ามแสดง ถ้าไม่มีค่าที่ไม่ได้ส่งมา
  //mobile: Joi.string().default(Joi.ref('emailOrMobile')).forbidden()
  email: Joi.forbidden().when("email", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emai")),
  }),

});

exports.loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required()
})

// const test = {
//   firstName: "aaaa",
//   lastName: "bbbb",
//   emailOrMobile: "bbb@gmail.com",
//   password: "2222222",
//   confirmPassword: "2222222",
// };
// const { value, error } = registerSchema.validate(test);
// console.log(value);
// console.log(error);

// prisma.user.create({
//     data: {
//         firstName: '',
//         lastName: "bbbb",
//         emailOrMobile: '',
//         password: '',
//         confirmPassword: '',
//     }
// })