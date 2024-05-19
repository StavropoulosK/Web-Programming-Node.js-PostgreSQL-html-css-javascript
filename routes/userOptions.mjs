import express from 'express'

import * as userOptionsController from '../Controller/userOptions.mjs';
import * as authoriseController from '../Controller/generalMiddleware.mjs'



const router = express.Router();



router.route('/profile').get(authoriseController.authorise,userOptionsController.showProfile)
router.route('/uploadProfile').post(authoriseController.authorise,userOptionsController.readImage,userOptionsController.uploadProfileImage)
router.route('/kratisis').get(authoriseController.authorise,userOptionsController.showKratisis)
router.route('/aposindesi').get(authoriseController.authorise,userOptionsController.aposindesi)
router.route('/kritiki').post(authoriseController.authorise,userOptionsController.writeKritiki)
router.route('/akirosi').post(authoriseController.authorise,userOptionsController.akirosiKratisis)
router.route('/makeNextBookPayment').post(authoriseController.authorise,userOptionsController.makeNextBookPayment)
router.route('/displayNextBookPayment').post(authoriseController.authorise,userOptionsController.displayNextBookPayment)


export default router