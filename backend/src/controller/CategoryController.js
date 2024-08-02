const Category = require('../model/CategoryModel')
// [GET] /add-product
const addCategory = async (req, res, next) => {
    try 
    {
        const {name} = req.body
        const newCategory = new Category({name})
        await newCategory.save()
        return res.status(200).json(Category)
    }
    catch(error)
    {
        next(error)
    }
}

const getAllCategory = async (req, res, next) => {
    const categories = await Category.find({})
    return res.status(200).json({
        categories
    })
}

module.exports = {addCategory, getAllCategory}