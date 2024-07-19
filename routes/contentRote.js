const {Router} = require('express')
const contentRouter = Router();
const contentControllerV2 = require('../controller/contentControllerV2')
const upload = require('../middleware/uploadImage')


contentRouter.get('/getAllContent', contentControllerV2.getAllContent )
contentRouter.get('/getContentById/:id', contentControllerV2.getContentById);


contentRouter.post('/kidsprogramcontent', upload.single('cover_image') ,contentControllerV2.createCatagory )
contentRouter.get('/getAllKidsProgram', contentControllerV2.getAllKidsProgramContent )
contentRouter.get('/getKidsProgramById/:id', contentControllerV2.getContentById);

module.exports = contentRouter;
