const User = require('../model/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/apiError')

function signToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = (passwordgen, role) => catchAsync(async (req, res, next) => {

    data = {
        role: role == null ? "User" : role,
        working_hours: req.body.working_hours,
        working_weeks: req.body.working_weeks,
        name: req.body.name,
        email: req.body.email,
        password: passwordgen == null ? req.body.password : passwordgen,
        password_confirm: passwordgen == null ? req.body.password_confirm : passwordgen,
        dob: req.body.dob,
        image: req.body.image,
        field: req.body.field,
        year_of_exp: req.body.year_of_exp,
        description: req.body.description,
        citizen_id: req.body.citizen_id,
    }

    const newUser = await User.create(data)

    const token = signToken(newUser._id)

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: newUser,
            randomPass: passwordgen
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    //check if email and password data exists on req.body
    if (!email || !password) {
        throw new ApiError('email/password field required !!!', 400)
    }

    //check if user exists and password is valid
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new ApiError("Incorrect email/password", 401)
    }

    const isPwdCorrect = await user.correctPassword(password, user.password)

    if (!isPwdCorrect) {
        throw new ApiError("Incorrect email/password", 401)
    }

    const token = signToken(user._id)

    user.password = undefined

    //send token 
    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    })
})

exports.protect = catchAsync(async (req, res, next) => {

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        throw new ApiError('You are not logged in !!!', 401)
    }

    let userid;
    let iat;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            throw new ApiError("Invalid Token", 500)
        }

        userid = decoded.id
        iat = decoded.iat
    })

    const user = await User.findById(userid)
    if (!user || !user.active) {
        throw new ApiError("User doesn't exists", 401)
    }

    if (user.changePasswordAfter(iat)) {
        throw new ApiError('User recently changed password, Please log in again !!!', 401)
    }

    req.user = user

    next();
})

exports.restrictTo = (...roles) => catchAsync(async (req, res, next) => {

    if (roles.includes(req.user.role)) {
        return next()
    }

    throw new ApiError("Unauthorized access !!!", 403)

})

exports.setImageName = (imageName) => (req, res, next) => {
    req.imageName = imageName;
    next();
}