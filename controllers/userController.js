const catchAsync = require('../utils/catchAsync')
const User = require('../model/userModel')
const Prescription = require('../model/prescriptionModel')
const jwt = require('jsonwebtoken')

function signToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.updateUserProfile = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename

    console.log(req.body)

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        throw new ApiError(500, 'User not found !')
    }

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    })

})

exports.uploadPrescription = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename

    const pres = await Prescription.create({
        userid: req.user._id,
        image: req.body.image,
        date: Date.now(),
    });

    res.status(200).json({
        data: {
            pres
        }
    })
})

exports.getNearDoctors = catchAsync(async (req, res, next) => {
    const { distance } = req.params;

    const [lng, lat] = req.user.location.coordinates

    console.log(lat, lng, distance)

    if (!lat) {
        throw new ApiError(500, "Please provide your location first !!!")
    }

    const radius = distance / 6378.1;

    const nearDocs = await User.find({
        'role': 'Doctor',
        'location.coordinates': {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat],
                    radius
                ]
            }
        }
    })

    console.log(nearDocs);

    res.status(200).json({
        status: "success",
        results: nearDocs.length,
        data: nearDocs
    })
})