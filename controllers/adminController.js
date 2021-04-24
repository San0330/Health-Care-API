const User = require('../model/userModel')
const Order = require('../model/orderModel')
const catchAsync = require('../utils/catchAsync')
const authController = require('./authController')
const ApiError = require('../utils/apiError')

// admin creates user with some role assigned and a random password generated
// TODO: send the password to the given user's email when signup is success
exports.createUser = catchAsync(async (req, res, next) => {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (i = 1; i <= 10; i++) {
        var index = Math.floor(Math.random() * (str.length - 1));
        pass += str.charAt(index)
    }

    // remove this line to generate random pass
    pass = 'password'

    authController.signup(pass, req.body.role)(req, res, next);
})

exports.updateUser = catchAsync(async (req, res, next) => {
    var id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        throw new ApiError(500, 'User not found !')
    }

    res.status(200).json({
        data: {
            user
        }
    })
})

exports.getOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find().sort({ 'date': 1 })
        .populate({ path: 'userid' })
        .populate({ path: 'products.productId', model: 'Product', select: 'title image price' })

    for (var order of orders) {
        var productsarr = []

        for (var product of order['products']) {
            var adjProduct = {}

            adjProduct['name'] = product['productId']['title']
            adjProduct['image'] = product['productId']['image']
            adjProduct['price'] = product['productId']['price']
            adjProduct['productId'] = product['productId']['_id']
            adjProduct['quantity'] = product['quantity']

            productsarr.push(adjProduct)
        }

        order['products'] = [...productsarr]
    }

    res.status(200).json({
        data: {
            'orders': orders
        }
    })
})

exports.updateOrderStatus = catchAsync(async (req, res, next) => {

    console.log(req.params.id)
    console.log(req.body)

    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    })

    if (!updateOrder) {
        throw new ApiError(500, 'Order not found')
    }

    const orders = await Order.find().sort({ 'date': 1 })
        .populate({ path: 'userid' })
        .populate({ path: 'products.productId', model: 'Product', select: 'title image price' })

    for (var order of orders) {
        var productsarr = []

        for (var product of order['products']) {
            var adjProduct = {}

            adjProduct['name'] = product['productId']['title']
            adjProduct['image'] = product['productId']['image']
            adjProduct['price'] = product['productId']['price']
            adjProduct['productId'] = product['productId']['_id']
            adjProduct['quantity'] = product['quantity']

            productsarr.push(adjProduct)
        }

        order['products'] = [...productsarr]
    }

    res.status(200).json({
        data: {
            'orders': orders
        }
    })
})