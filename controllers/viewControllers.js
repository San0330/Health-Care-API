const catchAsync = require('../utils/catchAsync')
const Appointment = require('../model/appoinmentModel')
const Product = require('../model/productsModel')
const Category = require('../model/categoryModel')

exports.getHomeModel = catchAsync(async (req, res, next) => {
    const featuredProducts = await Product.find({ featured: true }).populate('category');
    const appointmentCount = await Appointment.count({ user: req.user._id })

    res.status(200).json({
        data: {
            featuredProducts,
            appointmentCount,
        }
    })
})

exports.getProducts = catchAsync(async (req, res, next) => {
    const categorys = await Category.find();
    const products = await Product.find().populate('category');

    res.status(200).json({
        data: {
            categorys,
            products,
        }
    })
})