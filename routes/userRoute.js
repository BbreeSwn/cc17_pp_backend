// patch get post
// เฉพาะ users ที่จะเข้าดูโปรแกรมต่างๆได้

const { Router } = require("express");
const serviceRouter = Router();
const userController = require('../controller/userController');

serviceRouter.get("/kidsprogram", userController.kidsprogram );

serviceRouter.patch("/profile", userController.profile);

serviceRouter.post("/activity", userController.activity);

module.exports = serviceRouter;
