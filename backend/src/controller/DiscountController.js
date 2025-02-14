// const Discount = require('../model/DiscountModel')
import Discount from '../model/DiscountModel.js'
export default class DiscountController {

    static async addDiscount(req, res, next) {
        try {
            const { product, discountValue, endDate } = req.body
            const dataDiscount = new Discount({
                idProduct : product,
                discountValue,
                endDate
            })

            let savedDiscount = await dataDiscount.save()
            let discount = await Discount.findById({_id : savedDiscount?._id})
                                        .populate('idProduct')
                                        .lean()
            if(discount.idProduct)
            {
                const {idProduct, ...rest} = discount 
                discount = {...rest, product : idProduct}
            }
            return res.status(201).json({ 
                status : 201,
                discount
             })
        }
        catch (error) {
            next(error)
        }
    }

    static async getAllDiscount(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const startPage = (page - 1) * limit
        const objectFilter = { deletedAt: null }
        let [discounts, totalDiscount] = await Promise.all([
            Discount.find(objectFilter)
                .skip(startPage)
                .limit(limit)
                .populate('idProduct')
                .lean()
            ,
            Discount.countDocuments(objectFilter)
        ])

        discounts = discounts?.map((discount) => {
            if(discount?.idProduct)
            {
                discount.product = discount.idProduct
                delete discount.idProduct
            }
            return discount
        })

        const totalPage = Math.ceil(totalDiscount / limit)
        return res.status(200).json({
            status: 200,
            page,
            limit,
            totalPage,
            totalDiscount,
            discounts
        })
    }


}

