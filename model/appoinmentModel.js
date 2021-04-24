const mongoose = require('mongoose')
const Schema = mongoose.Schema

var appointmentSchema = new Schema({
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    problem: {
        type: String,
        trim: true,
        required: [true, "Problem must be included."]
    },
    contacts: {
        type: String,
        trim: true,
        required: [true, "Contact number must be provided"]
    },
    timerange: {
        type: Array,
        start: String,
        end: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: String,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment