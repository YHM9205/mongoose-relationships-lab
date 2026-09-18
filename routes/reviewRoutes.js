const express = require('express')
const router = express.Router()
const Review = require('../models/review')
const Listing = require('../models/listing')
const User = require('../models/user')

router.get('/reviews', async (req,res) => {
    try {
        const reviews = await Review.find({})
            .populate('listing')
            .populate('creator')
        res.send(reviews)
    } catch (err) {
        res.send('Error: ' + err.message)
    }
})

router.post('/reviews', async (req, res) => {
    try {
        const newReview = await Review.create({
            reviewTitle: req.body.reviewTitle,
            reviewBody: req.body.reviewBody,
            rating: req.body.rating,
            listing: req.body.listing,
            creator: req.body.creator
        })

        res.redirect('/reviews')
    } catch (err) {
        res.send('Error: ' + err.message)
    }
})

router.get('/reviews/new', async (req,res) => {
    try {
        const listings = await Listing.find({})
        const users = await User.find({})
        res.render('reviews/new', { listings, users })
    } catch (err) {
        res.send('Error: ' + err.message)
    }
})

module.exports = router