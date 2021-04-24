const catchAsync = require('../utils/catchAsync')
const Category = require('../model/categoryModel')

exports.getCategorys = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({
        data: categories
    })
})

exports.createCategory = catchAsync(async (req, res, next) => {

    if (req.file) req.body.image = req.file.filename

    const category = await Category.create(req.body);

    res.status(200).json({
        data: category,
    })
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename

    const updatedItem = {
        ...req.body,
        updated_at: Date.now(),
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedItem, {
        new: true,
        runValidators: true,
    })

    if (!updatedCategory) throw new ApiError("No document found with that Id", 404)

    res.status(200).json({
        data: updatedCategory,
    })
})


exports.deleteCategory = catchAsync(async (req, res, next) => {
    const doc = await Category.findByIdAndDelete(req.params.id)

    if (!doc) throw new ApiError("No document found with that Id", 404)

    res.status(200).json({
        status: 'success',
        data: null,
    })
})
