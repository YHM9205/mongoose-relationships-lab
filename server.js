// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")
const User = require('./models/user')
const Listing = require('./models/listing')
const Category = require('./models/category')
const Reviewe = require('./models/review')
const review = require("./models/review")













// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal



async function conntectToDB() { //connection to the database
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}


conntectToDB()



async function testRelationships() {
    try {
        const newUser = await User.create({
            username: "yousif_host",
            password: "password123"
        })
        console.log("Created User", newUser)


        const newCategory = await Category.create({
            categoryName: "Villa_119"
        })
        console.log("Created Category", newCategory)



        const newListing = await Listing.create({
            streetAddress: "Road119, Block1824",
            city: "Hamad Town",
            price: 150,
            size: 200,
            owner: newUser._id,
            category: newCategory._id
        })
        console.log("Created Listing", newListing)


        const allListings = await Listing.find({})
            .populate('owner')
            .populate('category')

        console.log("Populated Listings:", allListings)

        const newReview = await Reviewe.create({
            reviewTitle: 'Beutiful and very clean',
            reviewBody: 'very nice and wonderful view',
            rating: 5,
            listing: newListing._id,
            creator: newUser._id
        })
        console.log("Created Review")

    } catch (error) {
        if (error.code === 11000) {
            console.log("Username or category already exists")
        } else {
            console.log("Error in Relationshipes", error)
        }
    }
}


testRelationships()
















// Routes go here
















app.listen(3000, () => {
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
