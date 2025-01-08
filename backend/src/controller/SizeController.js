// const Size = require('../model/SizeModel')
import Size from '../model/SizeModel.js'
export default class SizeController {

    static async addSize(req, res, next)  {
        const {name} = req.body
        const response = await Size.findOne({name})
        return res.status(200).json({response})
    }
}

