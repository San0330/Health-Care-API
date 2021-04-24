const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const viewController = require('../../controllers/viewControllers')

router.get('/home',
    authController.protect,
    viewController.getHomeModel);

router.get('/products',
    authController.protect,
    viewController.getProducts);

module.exports = router