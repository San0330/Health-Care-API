const mongoose = require('mongoose')
const Schema = mongoose.Schema

var OrderSchema = new Schema({
    userid: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must have a user id']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    products: {
        type: Array,
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: [true, "Product must have a quantity"]
        },
        unit: {
            type: String,
            default: 'tablet',
        }
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Processing", "Delievered", "Cancelled"],
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order