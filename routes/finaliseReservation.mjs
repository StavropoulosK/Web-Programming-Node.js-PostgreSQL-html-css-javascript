import express from 'express'

import * as finaliseReservation from '../Controller/finaliseReservation.mjs';
 

const router = express.Router();

router.route('/makeFirstBookPayment/:roomName/:amea/:atoma/:diamorfosi/:checkInDate/:checkInMonth/:checkInYear/:checkOutDate/:checkOutMonth/:checkOutYear/:theaStiThalasa/:kostos').get(finaliseReservation.makeFirstBookPayment)
router.route('/makeFirstBookPayment/:roomName/:amea/:atoma/:diamorfosi/:checkInDate/:checkInMonth/:checkInYear/:checkOutDate/:checkOutMonth/:checkOutYear/:kostos').get(finaliseReservation.makeFirstBookPayment)
router.route('/finaliseReservation').post(finaliseReservation.finaliseReservation)

export default router

