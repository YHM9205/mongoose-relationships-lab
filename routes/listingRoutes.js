const express = require('express');
const router = express.Router();
const lisCtrl = require('../controllers/listings');

router.get('/listings/new', lisCtrl.newListing);
router.post('/listings', lisCtrl.createListing);
router.get('/listings', lisCtrl.allListings);
router.get('/listings/:id', lisCtrl.showListing);
router.get('/listings/:id/edit', lisCtrl.editListing);
router.put('/listings/:id', lisCtrl.updateListing);
router.delete('/listings/:id', lisCtrl.deleteListing);

module.exports = router;