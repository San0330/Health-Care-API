const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const doctorController = require('../../controllers/doctorController')

router.get('/', authController.protect, doctorController.getDoctors);

module.exports = router