import express from 'express'

import * as finaliseReservation from '../Controller/finaliseReservation.mjs';
import * as authoriseController from '../Controller/generalMiddleware.mjs'


const router = express.Router();

router.route('/makeFirstBookPayment/:roomName/:amea/:atoma/:diamorfosi/:checkInDate/:checkInMonth/:checkInYear/:checkOutDate/:checkOutMonth/:checkOutYear/:theaStiThalasa/:kostos').get(authoriseController.authorise,finaliseReservation.makeFirstBookPayment)
router.route('/makeFirstBookPayment/:roomName/:amea/:atoma/:diamorfosi/:checkInDate/:checkInMonth/:checkInYear/:checkOutDate/:checkOutMonth/:checkOutYear/:kostos').get(authoriseController.authorise,finaliseReservation.makeFirstBookPayment)
router.route('/finaliseReservation').post(authoriseController.authorise,finaliseReservation.finaliseReservation)

export default router

