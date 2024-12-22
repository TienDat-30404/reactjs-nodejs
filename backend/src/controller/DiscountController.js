const Discount = require('../model/DiscountModel')
const addDiscount = async(req, res, next) => {
    try 
    {
        const {idProduct, discountValue, endDate} = req.body
        const discount = new Discount({
            idProduct,
            discountValue,
            endDate
        })
        await discount.save()
        return res.status(201).json({discount})
    }
    catch(error)
    {
        next(error)
    }

}

module.exports = {addDiscount}