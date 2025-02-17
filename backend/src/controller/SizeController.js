import mongoose from 'mongoose'
import Size from '../model/SizeModel.js'
export default class SizeController {

    static async addSize(req, res, next) {
        const { name, sizePriceMultiplier } = req.body
        try {
            const newSize = new Size({ name, sizePriceMultiplier });
            const size = await newSize.save();
            return res.status(201).json({
                size,
                status: 201
            });
        } catch (err) {
            return res.status(500).json({ message: "Fail when add size" });
        }
    }

    static async getAllSize(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            const objectFilter = { deletedAt: null }
            if (req.query.idSize) {
                if (!mongoose.Types.ObjectId.isValid(req.query.idSize)) {
                    return res.status(200).json({
                        status: 200,
                        page: 1,
                        limit: 0,
                        totalPage: 0,
                        totalSize: 0,
                        sizes: []
                    })
                }
                objectFilter._id = req.query.idSize
            }
            const [sizes, totalSize] = await Promise.all([
                Size.find(objectFilter)
                    .skip(startPage)
                    .limit(limit),
                Size.countDocuments(objectFilter)
            ])
            const totalPage = Math.ceil(totalSize / limit)
            return res.status(200).json(
                {
                    sizes,
                    page,
                    limit,
                    totalPage,
                    totalSize,
                    status: 200
                }
            )
        }
        catch (err) {
            return res.status(500).json({ message: "Fail when get all size" })
        }

    }

    static async updateSize(req, res, next) {
        try {
            const { id } = req.params
            const { name, sizePriceMultiplier } = req.body
            let attribute = await Size.findByIdAndUpdate(id, {
                name,
                sizePriceMultiplier
            }, { new: true })
            return res.status(200).json({
                status: 200,
                attribute
            })
        }
        catch (error) {
            next(error)
        }
    }

    static deleteSize = async (req, res, next) => {
        try {
            const { id } = req.params
            const size = await Size.updateOne({ _id: id }, { deletedAt: Date.now() }, { new: true })
            if (size.modifiedCount === 1) {
                return res.status(200).json({
                    status: 200,
                    size
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: `Fail when delete size : ${error.message}`
            })
        }
    }
}

