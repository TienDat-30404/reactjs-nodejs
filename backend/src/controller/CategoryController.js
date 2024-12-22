const Category = require('../model/CategoryModel')
// [GET] /add-product
const addCategory = async (req, res, next) => {
    try 
    {
        const {name, image} = req.body
        const category = new Category({name, image})
        await category.save()
        return res.status(200).json({category})
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

const updateCategory = async(req, res, next) => {
    const idCategory = req.params._id
    console.log(idCategory)
    const { name }  = req.body 
    console.log(name)
    const category = await Category.updateOne({_id : idCategory}, {
        name
    })
    return res.status(200).json({
        category,
        message : "Chỉnh sửa thể loại thành công"
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

module.exports = {addCategory, getAllCategory, detailCategory, updateCategory}