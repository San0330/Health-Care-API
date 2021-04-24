const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const adminController = require('../../controllers/adminController')

router.post('/signup', authController.signup())
router.post('/login', authController.login)

router.post('/create',
    authController.protect,
    authController.restrictTo('Admin'),
    adminController.createUser)

router.patch('/update/:id',
    authController.protect,
    authController.restrictTo('Admin'),
    adminController.updateUser)


router.post('/signup', authController.signup())
router.post('/login', authController.login)

module.exports = router