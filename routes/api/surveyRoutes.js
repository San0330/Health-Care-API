const express = require('express')
const router = express.Router()
const surveyController = require('../../controllers/survey_controller')
const authController = require('../../controllers/authController')

router.route('/').post(authController.protect, authController.restrictTo('Admin'), surveyController.createSurvey)
router.route('/').get(authController.protect, surveyController.getSurveys)
router.get('/details/:id', authController.protect, authController.restrictTo('Admin'), surveyController.surveyDetails)
router.post('/submit/:id', authController.protect, surveyController.submitSurvey)

module.exports = router