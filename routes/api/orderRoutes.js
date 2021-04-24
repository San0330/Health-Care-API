const express = require('express')
const router = express.Router()
const ordersController = require('../../controllers/ordersController')
const authController = require('../../controllers/authController')
const adminController = require('../../controllers/adminController')

router.route('/')
    .post(
        authController.protect,
        ordersController.createOrders)
    .get(authController.protect,
        ordersController.getOrdersUser)

router.route('/get-all')
    .get(authController.protect,
        adminController.getOrders)

router.route('/:id')
    .delete(authController.protect,
        ordersController.deleteOrder)

router.route('/updateStatus/:id').post(
    authController.protect,
    // authController.restrictTo('Admin'),
    adminController.updateOrderStatus)

module.exports = router