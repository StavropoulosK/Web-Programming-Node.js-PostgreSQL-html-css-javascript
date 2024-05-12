import express from 'express'

import * as initialPagesController from '../Controller/initialPages.mjs';

const router = express.Router();



router.route('/').get(initialPagesController.showFirstPage);  
router.route('/Aksiotheata').get(initialPagesController.showAksiotheata);  
router.route('/room/:room').get(initialPagesController.displayRoom)


export default router