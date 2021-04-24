const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productsController')
const ImageController = require('../../controllers/ImageController')
const authController = require('../../controllers/authController')

router.route('/')
    .get(authController.protect,
        productController.getProducts)
    .post(authController.protect,
        authController.restrictTo('Admin'),
        authController.setImageName('product'),
        ImageController.uploadImage,
        ImageController.resizeImage,
        productController.createProducts)

router.route('/:id')
    .delete(authController.protect,
        authController.restrictTo('Admin'),        
        productController.deleteProduct)
    .patch(authController.protect,
        authController.restrictTo('Admin'),
        authController.setImageName('product'),
        ImageController.uploadImage,
        ImageController.resizeImage,
        productController.updateProducts)

module.exports = router