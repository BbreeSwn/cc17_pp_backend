const tryCatch = require('../utils/tryCatch')
const prisma = require('../models')



// หา admin ทั้งหมด
const getAllAdmin =tryCatch(async (req,res,next) => {
    const {firstName , lastName, userName , password , confirmPassword} = req.body
    console.log("body check",req.body)
    //validation
    //! ถ้าไม่มี lastName, userName ,username , password ,confirmpassword , email
    
    res.json({msg: "hello admin"})
})


// หาแอดมิน get
const getAdminById = tryCatch(async (req,res,next) => {res.json({msg: `hello ${admin.userName}`})})
//create patch
const createAdmin = tryCatch(async  (req,res,next) => {
    console.log(req.body)
    res.json({msg: "create admin successfuly"}) })
// update admin
const updateAdmin = tryCatch(async (req,res,next) => {res.json({msg: "update content"})})
// delete admin
const deleteAdmin = tryCatch(async (req,res,next) => {res.json({msg: "Bye admin"})})






module.exports = {createAdmin , getAdminById ,getAllAdmin, updateAdmin , deleteAdmin}