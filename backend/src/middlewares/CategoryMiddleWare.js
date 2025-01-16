// const Category = require('../model/CartModel')
// const { isCheckExistNameCategory, isCheckExistCategory} = require('../utils/validate')

import Category from '../model/CartModel.js';
import { isCheckExistNameCategory, isCheckExistCategory } from '../utils/validate.js';

const validateAddCategory = async (req, res, next) => {
    const { name } = req.body
    const errors = {}
    const existNameCategory = await isCheckExistNameCategory(name)
    if (name == "") {
        errors.name = "Tên không được để trống"
    }
    if (!existNameCategory) {
        errors.name = "Tên thể loại đã tồn tại"
    }
    // if (!req.file) {
    //     errors.image = "Vui lòng chọn ảnh"
    // }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}

const middlewareUpdateCategory = async (req, res, next) => {
    const idCategory = req.params._id
    const errors = {}

    if (idCategory == null) {
        return res.status(404).json({
            message: "Id không tồn tại"
        })
    }
    const { name } = req.body
    const category = await Category.findOne({ _id: idCategory })
    console.log(category)
    if (name == "") {
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

export {
    validateAddCategory, middlewareUpdateCategory
}