const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/users', async (req,res)=> {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.redirect('/')
    } catch (err){
        if (err.code === 11000) {
            return res.status(400).send("Error: This Email is Existed!")
        }
        res.status(400).send("Error:" + err.message)
    }
});

module.exports = router;