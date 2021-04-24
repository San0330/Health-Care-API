const Order = require('../model/orderModel')
const Product = require('../model/productsModel')
const catchAsync = require('../utils/catchAsync')

exports.getOrdersUser = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ userid: req.user._id })
        .populate({ path: 'products.productId', model: 'Product', select: 'title image price' })

    for (var order of orders) {
        var productsarr = []
        order['userid'] = null;

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

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const doc = await Order.findByIdAndDelete(req.params.id);

    if (!doc) throw new ApiError("No document found with that Id", 404)

    res.status(200).json({
        status:'success',
        data: null
    })
})

exports.createOrders = catchAsync(async (req, res, next) => {
    req.body.userid = req.user._id
    const order = await Order.create(req.body);

    res.status(200).json({
        data: order
    })
})

// exports.getOrdersAdmin = catchAsync(async (req, res, next) => {
//     const orders = await Order.find({ userid: req.user._id })
//         .populate({ path: 'userid', select: 'name image location' })

//     console.log(orders)

//     res.status(200).json({
//         data: {
//             'orders': orders
//         }
//     })
// })

exports.updateOrderStatus = catchAsync(async (req, res, next) => {

    console.log(req.params.id)
    console.log(req.body)

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    })

    if (!order) {
        throw new ApiError(500, 'Order not found')
    }

    res.status(200).json({
        data: {
            order,
        }
    })
})