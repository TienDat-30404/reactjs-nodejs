const Category = require('../model/CategoryModel')
// [GET] /add-product
const addCategory = async (req, res, next) => {
    try 
    {
        const {name, image} = req.body
        const newCategory = new Category({name, image})
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

// detail category 
const detailCategory = async(req, res, next) => {
    const idCategory = req.params.idCategory
    const category = await Category.find({idCategory : idCategory})
    return res.status(200).json({
        category
    })
}

module.exports = {addCategory, getAllCategory, detailCategory}