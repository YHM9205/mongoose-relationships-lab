const mongoose = require('mongoose')

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
        max: [65, 'Age must not be bigger then 65']
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
    }

}, { timestamps: true })



const User = mongoose.model('User', userSchema)
module.exports = User