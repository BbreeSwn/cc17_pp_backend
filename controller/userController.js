/*
- users สามารถ แก้ไข profile ได้ 
- usersเท่านั้นที่สามาถเข้าดูหน้า คิดโปรแกรม และ ลองทำดูได้
- users เท่านั้นที่สามารถอัพโหลดผลงานได้


*/


const tryCatch = require('../utils/tryCatch');


// watch content
const kidsprogram = tryCatch(async (req, res, next) => {
  console.log(req.users)
    res.json({ message: `hello, ${req.users.userName}` });
  });





  //* create profile 
const profile = tryCatch(async  (req, res, next) => {
  
    res.json({ message: "this is profile" });
  });



// upoad file for activity
const activity = tryCatch(async (req, res, next) => {
    res.json({ msg: "this is activity" });
  });

  module.exports = {kidsprogram,profile,activity }