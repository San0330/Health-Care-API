const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')

var userSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'User must provide name']
    },
    dob: Date,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email'],
    },
    citizen_id: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    password_confirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        // Only works on create and save
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password are not the same !!!'
        },
    },
    password_changed_at: Date,
    image: {
        type: String,
    },
    role: {
        type: String,
        default: 'User',
        enum: ["Admin", "Doctor", "User"],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    working_hours: {
        type: Array,
        start: String,
        end: String, 
    },
    working_weeks: {
        type: Array,
    },
    field: {
        type: String,
    },
    years_of_exp: {
        type: Number,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    contact: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
        },
        address: {
            type: String,
        }
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 8)
    this.password_confirm = undefined
    next()
})

userSchema.methods.correctPassword = async function (candidatePwd, userPwd) {
    return await bcrypt.compare(candidatePwd, userPwd)
}

userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
    if (this.password_changed_at) {
        const changedTimeStamp = parseInt(this.password_changed_at.getTime() / 1000);
        return JWTTimeStamp < changedTimeStamp
    }
    return false
}

const User = mongoose.model('User', userSchema)

module.exports = User