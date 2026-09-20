// imports
const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")



const User = require('./models/user')
const Listing = require('./models/listing')
const Category = require('./models/category')
const Review = require('./models/review')

const authRoutes = require('./routes/UserRoutes')
const listingRoutes = require('./routes/listingRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const reviewRoutes = require('./routes/reviewRoutes')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));




// Routes
app.get('/', (req, res) => {
    res.render('homepage')
})
app.use('/auth',authRoutes); 
app.use(listingRoutes);
app.use(categoryRoutes);
app.use(reviewRoutes);


async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}

connectToDB()


app.listen(3000, () => {
    console.log("Listening on port " + 3000)
})