const mongoose = require('mongoose')
const Schema = mongoose.Schema

var categorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: [true, "Name must be unique"],
        required: [true, "category must have a title/name"]
    },    
    description: {
        type: String,
        trim: true,
        required: [true, "category must have a description"]
    },
    image: {
        type: String,
        default: "noimage.jpeg",
    },    
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category