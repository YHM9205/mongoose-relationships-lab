const Category = require('../models/category');

const newCategory = (req, res) => {
  res.render('categories/new')
}


const createCategory = async (req, res) => {
  try {
    const categoryName = req.body;
    await Category.create({ categoryName })
    res.render('/categoies')
  } catch (error) {
    console.log(error)
    res.render('/categories/new', { errorMessage: error.message })
  }
}
const allCategories = async (req,res)=>{
  try {
    const categories = await Category.find()
    res.render('categories/index', {categories})
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

module.exports = {newCategory, createCategory, allCategories}