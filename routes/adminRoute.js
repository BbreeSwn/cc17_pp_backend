const {Router} = require('express')
const manageContentRouter = Router();
const contentController = require('../controller/contentController')
const upload = require('../middleware/uploadImage')


// get content complet
manageContentRouter.get('/content/catagory/:id', contentController.getContentByCatagoryId )
// creat admin complete
manageContentRouter.post('/content',upload.single('cover_image') , contentController.createContent )
// create catagory
manageContentRouter.post('/content/catagory', contentController.createCatagory )
//update admin
manageContentRouter.patch('/content/:id', contentController.updateContent )
// delete admin
manageContentRouter.delete('/content/:id', contentController.deleteContent)

module.exports = manageContentRouter;

