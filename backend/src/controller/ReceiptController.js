import DetailReceipt from "../model/DetailReceipt.js";
import Receipt from "../model/ReceiptModel.js";
import ProductAttribute from '../model/ProductAttribute.js'
export default class ReceiptController {

    static async getAllReceipt(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            let [receipts, totalReceipt] = await Promise.all([
                Receipt.find({})
                    .skip(startPage)
                    .limit(limit)
                    .populate('idUser')
                    .populate('idSupplier')
                    .populate({
                        path: 'receiptDetails',
                        populate: [
                            {
                                path: 'idProduct',
                                model: 'Product'
                            },
                            {
                                path: 'idAttribute',
                                model: 'Size'
                            }
                        ]
                    }).lean(),
                Receipt.countDocuments()
            ])
            const totalPage = Math.ceil(totalReceipt / limit)

            if (receipts && receipts?.length > 0) {
                receipts = receipts.map(receipt => {
                    receipt.user = receipt.idUser
                    receipt.supplier = receipt.idSupplier
                    delete receipt.idUser
                    delete receipt.idSupplier
                    if (receipt?.receiptDetails.length > 0) {
                        receipt?.receiptDetails.map(item => {
                            item.product = item.idProduct
                            item.attribute = item.idAttribute
                            delete item.idProduct
                            delete item.idAttribute
                        })
                    }
                    return receipt
                })
            }
            return res.status(200).json({
                status: 200,
                page,
                totalPage,
                totalReceipt,
                limit,
                receipts
            })
        }
        catch (err) {
            return res.status(500).json({
                message: `Fail when get all receipt : ${err}`
            })
        }
    }

    static async importProduct(req, res, next) {
        try {
            const { idUser, name, idSupplier, totalPrice, products } = req.body
            const savedReceipt = await Receipt.create({
                idUser,
                name,
                idSupplier,
                totalPrice
            })
            const detailReceipt = await Promise.all(
                products.map(async (product) => {
                    await DetailReceipt.create({
                        idReceipt: savedReceipt?._id,
                        idProduct: product?.idProduct,
                        idAttribute: product?.idAttribute,
                        priceImport: product?.price,
                        quantity: product?.quantity
                    });

                    await ProductAttribute.updateOne(
                        {
                            idProduct : product?.idProduct,
                            idSize : product?.idAttribute
                        },
                        {
                            $set : {
                                priceImport : product?.price,
                                priceBought : product?.price + ( (20 * product?.price) / 100 )
                            },
                            $inc : {
                                quantity : product?.quantity
                            }
                        }
                    )
                    

                })

            )

            let receipt = await Receipt.findOne({ _id: savedReceipt?._id.toString() })
                .populate('idUser')
                .populate('idSupplier')
                .populate({
                    path: 'receiptDetails',
                    populate: [
                        {
                            path: 'idProduct',
                            model: 'Product'
                        },
                        {
                            path: 'idAttribute',
                            model: 'Size'
                        }
                    ]
                }).lean()

            if (receipt) {
                receipt.user = receipt.idUser
                receipt.supplier = receipt.idSupplier
                delete receipt.idUser
                delete receipt.idSupplier
                if (receipt?.receiptDetails.length > 0) {
                    receipt?.receiptDetails?.map(item => {
                        item.product = item.idProduct
                        item.attribute = item.idAttribute
                        delete item.idProduct
                        delete item.idAttribute
                    })
                }

            }
            return res.status(201).json({
                status: 201,
                receipt
            })

        }
        catch (err) {
            return res.status(500).json({
                message: `Fail when import product : ${err}`
            })
        }
    }
}