const catchAsync = require('../utils/catchAsync')
const User = require('../model/userModel')

exports.getDoctors = catchAsync(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" }).sort({ "name": 1 });
    console.log(doctors)

    res.status(200).json({
        data: {
            doctors
        }
    })
})