const Listing = require('../models/listing');
const Category = require('../models/category');

const newListing = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('listings/new', { categories, errorMessage: null });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

const createListing = async (req, res) => {
  try {
    const { title, description, streetAddress, city, price, size, category, owner } = req.body;

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

    if (!listing) {
      return res.redirect('/listings');
    }

    res.render('listings/details', { listing });
  } catch (error) {
    console.log(error);
    res.redirect('/listings');
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

const editListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const categories = await Category.find();

    if (!listing) {
      return res.redirect('/listings');
    }

    res.render('listings/edit', { listing, categories });
  } catch (error) {
    console.log(error);
    res.redirect('/listings');
  }
};

const updateListing = async (req, res) => {
  try {
    const { title, description, streetAddress, city, price, size, category } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { title, description, streetAddress, city, price, size, category },
      { new: true }
    );

    if (!listing) {
      return res.redirect('/listings');
    }

    res.redirect(`/listings/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/listings/${req.params.id}/edit`);
  }
};

const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect('/listings');
  } catch (error) {
    console.log(error);
    res.redirect('/listings');
  }
};

module.exports = {
  newListing,
  createListing,
  showListing,
  allListings,
  editListing,
  updateListing,
  deleteListing
};