const Category = require("../../models/category")

const createCategory = async (req, res) => {
    try {
        const categoryName = req.body
        const category = await Category.create({ categoryName })
        res.redirect('/categories')
    } catch (error) {
        console.log(error) 
            res.render('categories/create-category', { errorMessage: error.message })
        }
    }

    const allCategories = async (req,res) =>{
        try{
            const categories = await Category.find()
            res.render('categories/all-categories', {categories})
        } catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }
    module.exports = { createCategory, allCategories}