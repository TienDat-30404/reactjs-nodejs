// const Size = require('../model/SizeModel')
import Size from '../model/SizeModel.js'
export default class SizeController {

    static async addSize(req, res, next) {
        const { name } = req.body
        const response = await Size.findOne({ name })
        return res.status(200).json({ response })
    }

    static async getAllSize(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 100
            const startPage = (page - 1) * limit
            const sizes = await Size.find({})
                .skip(startPage)
                .limit(limit)
            const totalPage = Math.ceil(sizes.length / limit)
            const totalSize = sizes.length
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
}

