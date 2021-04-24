const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const userController = require('../../controllers/userController')
const ImageController = require('../../controllers/ImageController')

router.patch('/update', authController.protect,
    authController.setImageName('user'),
    ImageController.uploadImage,
    ImageController.resizeImage,
    userController.updateUserProfile);

router.post('/upload-prescription', authController.protect,
    authController.setImageName('prescription'),
    ImageController.uploadImage,
    ImageController.resizeImage,
    userController.uploadPrescription);

router.get('/doctor-within/:distance', authController.protect,
    userController.getNearDoctors)

module.exports = router