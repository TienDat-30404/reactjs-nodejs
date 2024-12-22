const Size = require('../model/SizeModel')
const addSize = async(req, res, next) => {
    const {name} = req.body
    const response = await Size.findOne({name})
    return res.status(200).json({response})
}

module.exports = {addSize}
