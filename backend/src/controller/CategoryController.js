// const Category = require('../model/CategoryModel')
import Category from '../model/CategoryModel.js'
// [GET] /add-product

export default class CategoryController {
    
    static async addCategory(req, res, next)  {
        try 
        {
            const {name, image} = req.body
            const category = new Category({name, image})
            await category.save()
            return res.status(200).json(
                {
                    category,
                    status : 201
                }
            )
        }
        catch(error)
        {
            next(error)
        }
    }
    
    static async getAllCategory(req, res, next)  {
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
            totalCategory,
            status : 200
    
        })
    }
    
    static async updateCategory(req, res, next)  {
        const idCategory = req.params._id
        const { name }  = req.body 
        const category = await Category.updateOne({_id : idCategory}, {
            name
        })
        return res.status(200).json({
            category,
            message : "Chỉnh sửa thể loại thành công"
        })
    }
    
    // detail category 
    static async detailCategory(req, res, next)  {
        const idCategory = req.params.idCategory
        const category = await Category.find({_id : idCategory})
        return res.status(200).json({
            category
        })
    }
}

