const { Router } = require("express");
const authRouter = Router();
const authController = require("../controller/authController");
const { registerValidator, loginValidator } = require("../middleware/validator");
const authenticate = require("../middleware/authenticate");
const admin_authenticate = require("../middleware/admin_authenticate");


//todo register
authRouter.post("/register", registerValidator ,authController.register );

//todo login
authRouter.post("/login", loginValidator,authController.login);
// authRouter.post("/login", (req,res)=>{
//     res.send(req.body)
// });
// authRouter.post("/login",loginValidator,()=>{console.log('_________here')});
authRouter.post("/login-admin", loginValidator,authController.loginAdmin);


authRouter.get("/me" , authenticate ,authController.me)

authRouter.get("/admin" , admin_authenticate ,authController.meAdmin)


module.exports = authRouter;
