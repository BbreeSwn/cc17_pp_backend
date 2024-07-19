const {Router} = require('express')
const manageContentRouter = Router();
const contentController = require('../controller/contentController')
const upload = require('../middleware/uploadImage')


// get content complet
manageContentRouter.get('/content/catagory/:id', contentController.getContentByCatagoryId )
// creat admin complete
manageContentRouter.post('/content',upload.single('cover_image') , contentController.createContent )
// create catagory
manageContentRouter.post('/kidsprogramcontent', upload.single('cover_image'),contentController.createKidsProgram )
//update admin
manageContentRouter.patch('/content/:id', contentController.updateContent )

//get contentBy Id
manageContentRouter.get('/content/:id', contentController.getContentById)
// delete admin
manageContentRouter.get('/content', contentController.getAllContent)
// get all
manageContentRouter.delete('/content/:id', contentController.deleteContent)

module.exports = manageContentRouter;

