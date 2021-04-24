const mongoose = require('mongoose')
const Schema = mongoose.Schema

var surveySubmissionsSchema = new Schema({
    surveyId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Survey'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    submission: [
        {
            question: String,
            answer: String,
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


const SurveySubmissions = mongoose.model('SurveySubmissions', surveySubmissionsSchema,'surveysubmissions')

module.exports = SurveySubmissions