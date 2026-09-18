// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const path = require("path")
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")

const User = require('./models/user')
const Listing = require('./models/listing')
const Category = require('./models/category')
const Reviewe = require('./models/review')

const userRoutes = require('./routes/UserRoutes')
const listingRoutes = require('./routes/listingRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const reviewRoutes = require('./routes/reviewRoutes')












app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: true })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")); // logs the requests as they are sent to our sever in the terminal




app.use(userRoutes);
app.use(listingRoutes);
app.use(categoryRoutes);
app.use(reviewRoutes);


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



















// Routes go here
app.get('/', async (req,res)=> {
    res.send("Homepage")
})










app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000






