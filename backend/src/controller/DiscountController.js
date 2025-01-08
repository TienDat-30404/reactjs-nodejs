// const Discount = require('../model/DiscountModel')
import Discount from '../model/DiscountModel.js'
export default class DiscountController {

    static async addDiscount(req, res, next)  {
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
}

