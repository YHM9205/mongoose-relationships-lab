const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/categories'); 


router.get('/listings/new', catCtrl.newListing);
router.post('/listings', catCtrl.createListing);
router.get('/listings', catCtrl.allListings)



module.exports = router