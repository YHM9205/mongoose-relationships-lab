const express = require('express')
const router = express.Router()
const Listing = require('../routes/UserRoutes')


router.get('/listings', async(req,res)=>{
    try {
        const listings = await Listing.propfind({}).populate('owner').populate('category')
        es.render('lisrings/index', {listings})
    } catch (err) {
        res.status(500).send("Error:" + err.message)
    }
})

module.exports = router