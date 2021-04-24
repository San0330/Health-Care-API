const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PrescriptionSchema = new Schema({
    userid: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must have a user id']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

const Prescription = mongoose.model('Prescription', PrescriptionSchema)
module.exports = Prescription