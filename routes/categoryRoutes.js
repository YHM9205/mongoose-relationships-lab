const express = require('express');
const router = express.Router();
const Category = require('../models/category')

router.get('/categories', async (req,res)=>{
try{
    const categories = await Category.find({})
    res.render('categories/index', {categories})
} catch (err) {
    res.send("Error: " + err.message)
}
})

router.post('/categories', async (req,res)=>{
try{
    const newCategory = new Category(req.body)
    await newCategory.save()
    res.redirect('/categories')
} catch (err) {
    res.send("Error: " + err.message)
}
})

module.exports = router