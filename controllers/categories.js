const Listing = require('../models/listing');
const Category = require('../models/category');

const newListing = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('listings/new', { categories, errorMessage: null });
  } catch (error) {
    console.log(error);
    res.render('/');
  }
};

const createListing = async (req, res) => {
  try {
    const { title, description, streetAddress, city, price, size, category } = req.body;
    const owner = req.session.user ? req.session.user._id : req.body.owner; 
    
    const listing = await Listing.create({
      title,
      description,
      streetAddress,
      city,
      price,
      size,
      owner,
      category
    });
    res.redirect(`/listings/${listing._id}`);
  } catch (error) {
    console.log(error);
    const categories = await Category.find();
    res.render('listings/new', { categories, errorMessage: error.message });
  }
};

const showListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('owner category');
    res.render('listings/show', { listing });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

const allListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('owner category');
    res.render('listings/index', { listings });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

module.exports = { 
    newListing, 
    createListing, 
    showListing, 
    allListings 
};