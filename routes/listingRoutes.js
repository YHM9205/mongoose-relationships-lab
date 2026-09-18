const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')
const Category = require('../models/category')
const User = require('../models/user')

router.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find({})
            .populate('owner')
            .populate('category')
        res.render('listings/index', { listings })
    } catch (err) {
        res.send("Error:" + err.message)
    }
})

router.get('/listings/new', async (req, res) => {
    try {
        const categories = await Category.find({})
        const users = await User.find({})
        res.render('listings/new', { categories, users })
    } catch (err) {
        res.send("Error" + err.message)
    }
})

router.get('/listing/new', async (req, res) => {
    try {
        const categories = await Category.find({})
        const users = await User.find({})
        res.render('listings/new', { categories, users })
    } catch (err) {
        res.send("Error" + err.message)
    }
})

router.post('/listings', async (req, res) => {
    try {
        const newListing = new Listing({
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            price: req.body.price,
            size: req.body.size,
            category: req.body.category,
            owner: req.body.owner,
            isAvailable: req.body.isAvailable === 'on'
        })

        await newListing.save()
        res.redirect('/listings')
    } catch (err) {
        res.send("Error: " + err.message)
    }
})

module.exports = router