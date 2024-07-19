const {Router} = require('express')
const newsRouter = Router();
const contentControllerV2 = require('../controller/contentControllerV2');
const admin_authenticate = require('../middleware/admin_authenticate');

newsRouter.patch('/:id', admin_authenticate ,contentControllerV2.updateStory);
newsRouter.get('/:id',contentControllerV2.getNewsContentById);
newsRouter.get('/:id',contentControllerV2.getContentById);




module.exports = newsRouter;