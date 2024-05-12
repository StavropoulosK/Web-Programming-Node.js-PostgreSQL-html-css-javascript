import express from 'express'

import * as userOptionsController from '../Controller/userOptions.mjs';

const router = express.Router();



router.route('/kratisis').get(userOptionsController.showKratisis)
router.route('/aposindesi').get(userOptionsController.aposindesi)
router.route('/kritiki').post(userOptionsController.writeKritiki)
router.route('/akirosi').post(userOptionsController.akirosiKratisis)
router.route('/makeNextBookPayment').post(userOptionsController.makeNextBookPayment)
router.route('/displayNextBookPayment').post(userOptionsController.displayNextBookPayment)


export default router