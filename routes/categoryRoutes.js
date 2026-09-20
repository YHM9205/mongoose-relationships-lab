const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/category'); 


router.get('/categories/new', catCtrl.newCategory);
router.post('/categories', catCtrl.allCategories);
router.get('/categories', catCtrl.allCategories)



module.exports = router