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

    module.exports = { createCategory}