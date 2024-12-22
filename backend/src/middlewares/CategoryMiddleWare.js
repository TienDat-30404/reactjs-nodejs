const Category = require('../model/CartModel')
const { isCheckExistNameCategory, isCheckExistCategory} = require('../utils/validate')
const validateAddCategory = async (req, res, next) => {
    const {name} = req.body
    const existNameCategory = await isCheckExistNameCategory(name)
    if(name == "")
    {
        return res.status(400).json({
            message : "Tên thể loại không được để trống"
        })
    }
    if(!existNameCategory)
    {
        return res.status(400).json({
            message : "Tên thể loại đã tồn tại"
        })
    }
    
    next()
}

const middlewareUpdateCategory = async(req, res, next) => {
    const idCategory = req.params._id
    const errors = {}

    if(idCategory == null)
    {
        return res.status(404).json({
            message : "Id không tồn tại"
        })
    }
    const {name} = req.body 
    const category = await Category.findOne({_id : idCategory})
    console.log(category)
    if(name == "")
    {
        errors.name = "Tên thể loại không được để trống"
    }
    else {
        if (name != category.name) {
            console.log("name", name)
            console.log("categoryName", category.name)
            const isCheckName = await isCheckExistCategory(name)
            if (!isCheckName) {
                errors.name = "Tên thể loại đã tồn tại"
            }
        }
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}

module.exports = {
    validateAddCategory, middlewareUpdateCategory
}