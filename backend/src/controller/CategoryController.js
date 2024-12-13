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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const startPage = (page - 1) * limit
    const categories = await Category.find({})
                                    .skip(startPage)
                                    .limit(limit)
    const totalPage = Math.ceil(categories.length / limit)
    const totalCategory = categories.length
    return res.status(200).json({
        categories,
        page,
        limit,
        totalPage,
        totalCategory

    })
}

// detail category 
const detailCategory = async(req, res, next) => {
    const idCategory = req.params.idCategory
    const category = await Category.find({_id : idCategory})
    return res.status(200).json({
        category
    })
}

module.exports = {addCategory, getAllCategory, detailCategory}