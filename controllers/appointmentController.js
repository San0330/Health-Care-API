const Appointment = require('../model/appoinmentModel')
const catchAsync = require('../utils/catchAsync')

exports.createAppointment = catchAsync(async (req, res, next) => {

    req.body.user = req.user._id;

    console.log(req.body)

    const appointment = await Appointment.create(req.body);

    console.log(appointment)


    res.status(200).json({
        "appointment": appointment,
    })

})

exports.getAppointments = catchAsync(async (req, res, next) => {
    const appointments = await Appointment.find({ user: req.user._id })
        .populate({ path: 'user', select: 'name image coordinates role email' })
        .populate({ path: 'doctor', select: 'name image field' })
    console.log(appointments)

    res.status(200).json({
        data: {
            "appointments": appointments
        }
    })
})

exports.getAppointmentsForDoctor = catchAsync(async (req, res, next) => {

    const appointments = await Appointment.find({ doctor: req.user._id })
        .populate({ path: 'user', select: 'name image coordinates role email' })
        .populate({ path: 'doctor', select: 'name image field' })

    console.log(appointments)

    res.status(200).json({
        data: {
            "appointments": appointments
        }
    })
})

exports.deleteAppointment = catchAsync(async (req, res, next) => {
    const doc = await Appointment.findByIdAndDelete(req.params.id)
    console.log(req.params.id);
    if (!doc) throw new ApiError("No appointment found with that Id", 404)

    res.status(200).json({
        status: 'success',
        data: null,
    })
})
