const {rateLimit} = require('express-rate-limit');

//สร้าง option ค่าที่จะยิงเข้ามา คือ ในช่วง 10 นาที ส่งรีเควสได้ limitที่2
const limiter = rateLimit({ 
windowMs: 10* 60 * 1000,
limit : 100,
message: {message: 'too much request in given period...'}
}); 

module.exports = limiter;