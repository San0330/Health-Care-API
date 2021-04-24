const Product = require('../model/productsModel')
const ApiError = require('../utils/apiError')
const catchAsync = require('../utils/catchAsync')
const Category = require('./../model/categoryModel');

exports.getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        data: products
    })

})

exports.createProducts = catchAsync(async (req, res, next) => {

    if (req.file) req.body.image = req.file.filename

    console.log(req.body)

    const product = await Product.create(req.body);

    res.status(200).json({
        data: product,
    })
})

exports.updateProducts = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename    
    
    const updatedItem = {
        ...req.body,
        updated_at: Date.now(),
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedItem, {
        new: true,
        runValidators: true,
    })

    if (!updatedProduct) throw new ApiError("No document found with that Id", 404)

    res.status(200).json({
        data: updatedProduct,
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const doc = await Product.findByIdAndDelete(req.params.id)

    if (!doc) throw new ApiError("No document found with that Id", 404)

    res.status(200).json({
        status: 'success',
        data: null,
    })
})
