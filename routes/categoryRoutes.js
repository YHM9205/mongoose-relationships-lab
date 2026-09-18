const express = require('express');
const router = express.Router();
const catCtr1 = require('../controllers/category')


router.get('/categories/new', catCtr1.createCategory);
router.post('/categories', catCtr1.createCategory);
router.get('/categorries', catCtr1.allCategories)



module.exports = router