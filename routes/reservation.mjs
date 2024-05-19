import express from 'express'

import * as reservationController from '../Controller/reservation.mjs';

import * as authoriseController from '../Controller/generalMiddleware.mjs'

const router = express.Router();



router.route('/olaTaDomatiaKlismena/:year/:month/:diamorfosi/:amea/:roomName').get(reservationController.datesNotAvailable)
router.route('/roomTypeAvailable/:roomName/:amea/:diamorfosi/:checkInDate/:checkInMonth/:checkInYear/:checkOutDate/:checkOutMonth/:checkOutYear').get(reservationController.checkIfRoomTypeIsAvailable)
router.route('/timesDomatiou/:roomName/:currentCalendarYear/:currentCalendarMonth').get(reservationController.returnTimesDomatiou)
router.route(`/confirmReservation`).post(authoriseController.authorise,reservationController.confirmReservation)


export default router