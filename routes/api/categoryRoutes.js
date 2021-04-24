const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/categoryController')
const ImageController = require('../../controllers/ImageController')
const authController = require('../../controllers/authController')

router.route('/')
    .get(authController.protect,
        categoryController.getCategorys)
    .post(authController.protect,
        authController.restrictTo('Admin'),
        authController.setImageName('category'),
        ImageController.uploadImage,
        ImageController.resizeImage,
        categoryController.createCategory)

router.route('/:id')
    .delete(authController.protect,
        authController.restrictTo('Admin'),
        categoryController.deleteCategory)
    .patch(authController.protect,
        authController.restrictTo('Admin'),
        authController.setImageName('category'),
        ImageController.uploadImage,
        ImageController.resizeImage,
        categoryController.updateCategory)

module.exports = router