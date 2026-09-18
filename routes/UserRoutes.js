const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.redirect('/users')
    } catch (err) {
        if (err.code === 11000) {
            return res.send("Error: This Email is Existed!")
        }
        res.send("Error:" + err.message)
    }
})


router.post("/sign-up", async (req, res) => {
    try {
        const confirmPassword = req.body.confirmPassword || req.body.confirmpassword
        const username = req.body.username
        const password = req.body.password

        const userInDatabase = await User.findOne({ username })
        if (userInDatabase) {
            return res.send("Username already taken")
        }

        if (password !== confirmPassword) {
            return res.send("Passwords dosnt match")
        }

        const email = req.body.email || `${username}@example.com`
        const age = Number(req.body.age || 18)

        const hashedPassword = bcrypt.hashSync(password, 10)

        await User.create({
            username,
            email,
            password: hashedPassword,
            age,
            role: req.body.role || 'tenant'
        })

        res.redirect("/auth/sign-in")
    } catch (err) {
        res.send("Error: " + err.message)
    }
})


module.exports = router;