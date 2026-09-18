const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:[5, 'Title is too short!']
    },
    diseription:{
        type:String,
        required:true,
        maxlength:[119,'Description is too long!']
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    propertyType:{
        type:String,
        required:true,
        enum:['Flat', 'Villa', 'Compound', 'Village']
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    size: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)
module.exports = Listing