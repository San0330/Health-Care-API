const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: [true, "Name must be unique"],
        required: [true, "Product must have a title/name"]
    },
    price: {
        type: Number,
        required: [true, "Product must have a price"]
    },
    discountRate: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => {
                return value >= 0 && value <= 100
            },
            message: 'Discount percent ({VALUE}) is not correct'
        }
    },
    review: {
        type: String,
    },
    ratingAvg: {
        type: Number,
        default: 1,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        trim: true,        
        required: [true, "Product must have a description"]
    },
    image: {
        type: String,
        default: "noimage.jpeg",
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    created_by: String,
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    updated_at: {
        type: Date,
        select: false,
    },
    featured: { type: Boolean, default: false, },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

//virtual property : discountedPrice that is computed from price & discountRate
productSchema.virtual('discountedPrice').get(function () {
    const discount = (this.discountRate * this.price) / 100
    return this.price - Math.ceil(discount)
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product