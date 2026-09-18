const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        minlength:[3, 'Category name must be at least 3 characters'],
        maxlegth:[50, 'Category name cannot be more then 50 characters']
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)
module.exports = Category