const express = require('express')
const router = express.Router()
const appointmentController = require('../../controllers/appointmentController')
const authController = require('../../controllers/authController')

router.route('/')
    .post(authController.protect, appointmentController.createAppointment)
    .get(authController.protect, appointmentController.getAppointments)

router.delete('/:id', authController.protect, appointmentController.deleteAppointment)

router.route('/doc-appointments')
    .get(authController.protect,
        appointmentController.getAppointmentsForDoctor
    )

module.exports = router