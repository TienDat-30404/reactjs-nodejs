const { isCheckExistNameCategory} = require('../utils/validate')
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

module.exports = {
    validateAddCategory
}