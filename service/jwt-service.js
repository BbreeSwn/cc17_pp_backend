const jwt = require('jsonwebtoken')

const jwtService = {};
jwtService.sign = (payload) => jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '7d'} ) // ไปสรา้ง secret key in .env

jwtService.verify = token => jwt.verify(token, process.env.JWT_SECRET);

module.exports =  jwtService;