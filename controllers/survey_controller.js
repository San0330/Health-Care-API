const catchAsync = require("../utils/catchAsync");
const Survey = require("../model/surveyModel")
const mongoose = require('mongoose');
const SurveySubmissions = require("../model/surveySubmissionsModel");

exports.createSurvey = catchAsync(async (req, res, next) => {
    await Survey.create(req.body)
    res.status(200);
})

exports.getSurveys = catchAsync(async (req, res, next) => {
    const surveys = await Survey.find();

    console.log(surveys);

    res.status(200).json({
        data: surveys
    })

})

exports.surveyDetails = catchAsync(async (req, res, next) => {

    id = mongoose.Types.ObjectId(req.params.id);

    var x = await SurveySubmissions.aggregate(
        [
            {
                $match: {
                    surveyId: id,
                }
            },
            {
                $unwind: '$submission'
            },
            {
                $addFields: {
                    "question": "$submission.question",
                    "answer": "$submission.answer",
                },
            },
            {
                $project: {
                    submission: 0,
                }
            },
            {
                $group: {
                    _id: {
                        question: "$question",
                        answer: "$answer",
                    },
                    count: {
                        $sum: 1
                    },
                }
            },
            {
                $addFields: {
                    question: "$_id.question",
                    answer: "$_id.answer",
                }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $group: {
                    _id: "$question",
                    answers: {
                        $push: {
                            answer: "$answer",
                            count: "$count"
                        }
                    }
                }
            }
        ]
    )

    res.status(200).json({
        status: 'success',
        data: x
    });
})

exports.submitSurvey = catchAsync(async (req, res, next) => {
    const result = await SurveySubmissions.findOne({ userId: req.user.id, surveyId: req.body.surveyId })

    if (result != null) {
        return res.status(401).json({
            status: 'failed',
            message: "submission already made"
        });
    }

    await SurveySubmissions.create({
        'userId': req.user.id,
        ...req.body
    })

    res.status(200).json({
        status: 'success'
    });
})