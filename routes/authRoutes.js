const { Router } = require("express");
const authRouter = Router();
const authController = require("../controller/authController");


//todo register
authRouter.get("/register", authController.register );

//todo login
authRouter.post("/login", authController.login);

//todo logout
authRouter.delete("/logout", authController.logout);

module.exports = authRouter;
