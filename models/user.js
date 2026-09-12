const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, 'Email must be at least 10 characters'],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password is too short']
    },
    age: {
        type: Number,
        required: true,
        min: [16, 'Age must be at least 16'],
        max: [65, 'Age must not bigger then 65']
    },
    role: {
        type: String,
        enum: ['owner', 'tenant'],
        default: 'tenant'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    listing: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }],
        validate: (val) => val.length <= 5,
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next()

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        next(err)
    }
});

const User = mongoose.model('User', userSchema)
module.exports = User