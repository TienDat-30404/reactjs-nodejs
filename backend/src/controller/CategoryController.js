import Category from '../model/CategoryModel.js'
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';
export default class CategoryController {

    static async addCategory(req, res, next) {
        try {
            const { name } = req.body
            // console.log("name", name)
            // const result = await cloudinary.uploader.upload(req.file.path);
            // if (!req.file) {
            //     return res.status(400).json({ error: "File image is required." });
            // }
            // console.log("result", result)
            const category = new Category(
                {
                    name,
                    // image: result.secure_url
                }
            )
            await category.save()
            return res.status(201).json(
                {
                    category,
                    status: 201
                }
            )
        }
        catch (error) {
            return res.status(500).json({ message: `Fail when add category : ${error}` })
        }
    }

    static async getAllCategory(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const startPage = (page - 1) * limit
        const objectFilter = {}
        if (req.query.idCategory) {
            if (mongoose.Types.ObjectId.isValid(req.query.idCategory)) {
                objectFilter._id = req.query.idCategory
            } else {
                return res.json({
                    categories: [],
                    page: 1,
                    totalCategory: 0,
                    totalPage: 0,
                    objectSort: {},
                    limit: 0,
                    objectFilter: {},
                    status: 200
                });
            }
        }
        if (req.query.search) {
            objectFilter.name = { $regex: req.query.search, $options: 'i' }
        }
        console.log(objectFilter)
        const [categories, totalCategory] = await Promise.all([
            Category.find(objectFilter)
                .skip(startPage)
                .limit(limit),
            Category.countDocuments(objectFilter)
        ])

        const totalPage = Math.ceil(totalCategory / limit)
        return res.status(200).json({
            categories,
            page,
            limit,
            totalPage,
            totalCategory,
            status: 200

        })
    }

    static async updateCategory(req, res, next) {
        try {
            const idCategory = req.params.idCategory
            let { name, image } = req.body
            const categoryImage = await Category.findOne({ _id: idCategory })

            if (req.file) {
                const fileImage = await cloudinary.uploader.upload(req.file.path);
                image = fileImage.secure_url
            }
            else {
                image = categoryImage?.image
            }
            console.log(image)
            const category = await Category.findOneAndUpdate(
                { _id: idCategory },
                {
                    name,
                    image
                },
                { new: true }
            );
            return res.status(200).json({
                category,
                message: "Chỉnh sửa thể loại thành công",
                status: 200
            })
        }
        catch (error) {
            return res.status(500).json({ message: `Fail when update category : ${error}` })
        }
    }

    // detail category 
    static async detailCategory(req, res, next) {
        const idCategory = req.params.idCategory
        const category = await Category.find({ _id: idCategory })
        return res.status(200).json({
            category
        })
    }

    static async deleteCategory(req, res, next) {
        try {
            const idCategory = req.params.idCategory
            const category = await Category.deleteOne({ _id: idCategory })
            if (category.deletedCount > 0) {
                return res.status(200).json({
                    category,
                    message: "Xóa thể loại thành công",
                    status: 200
                })
            }

        }
        catch (error) {
            return res.status(500).json({ message: `Fail when delete category : ${error}` })
        }
    }
}
