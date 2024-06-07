const tryCatch = require('../utils/tryCatch');


const kidsprogram = tryCatch(async (req, res, next) => {
  console.log(req.users)
    res.json({ message: `hello, ${req.users.userName}` });
  });
const profile = tryCatch(async  (req, res, next) => {
  
    res.json({ message: "this is profile" });
  });
const activity = tryCatch(async (req, res, next) => {
    res.json({ msg: "this is activity" });
  });

  module.exports = {kidsprogram,profile,activity }