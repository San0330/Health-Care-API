const mongoose = require('mongoose')
const Schema = mongoose.Schema

var surveySchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: [true, "Title must be unique"],
        required: true
    },
    questions: {
        type: Array,
        question: {
            type: String,
            trim: true,
            required: true,
        },
        options: [String]
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey