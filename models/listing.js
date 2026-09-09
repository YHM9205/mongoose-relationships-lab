const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:Number
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },

}, { timestamps: true})

const Listing = mongoose.model('Listing', listingSchema)
module.exports = Listing