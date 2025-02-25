import DetailReceipt from "../model/DetailReceipt.js";
import Receipt from "../model/ReceiptModel.js";
import ProductAttribute from '../model/ProductAttribute.js'
import mongoose from "mongoose";
export default class ReceiptController {

    static async getAllReceipt(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            const objectFilter = { deletedAt: null }
            if (req.query.idReceipt) {
                if (mongoose.Types.ObjectId.isValid(req.query.idReceipt)) {
                    objectFilter._id = req.query.idReceipt
                } else {
                    return res.json({
                        receipts: [],
                        page: 1,
                        totalReceipt: 0,
                        totalPage: 0,
                        limit: 0,
                        status: 200
                    });
                }
            }
            if(req.query.supplier)
            {
                objectFilter.idSupplier = req.query.supplier
            }
            let [receipts, totalReceipt] = await Promise.all([
                Receipt.find(objectFilter)
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
                Receipt.countDocuments(objectFilter)
            ])
            const totalPage = Math.ceil(totalReceipt / limit)

            if (receipts && receipts?.length > 0) {
                receipts = receipts?.map(receipt => {
                    let { idUser, idSupplier, receiptDetails, ...restReceipt } = receipt
                    receiptDetails = receiptDetails?.map(item => {
                        const { idProduct, idAttribute, ...restReceiptDetail } = item
                        return item = {
                            ...restReceiptDetail,
                            product: idProduct,
                            attribute: idAttribute
                        }
                    })
                    return receipt = {
                        ...restReceipt,
                        user: idUser,
                        supplier: idSupplier,
                        receiptDetails

                    }
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

            for (const product of products) {
                await DetailReceipt.create({
                    idReceipt: savedReceipt?._id,
                    idProduct: product?.idProduct,
                    idAttribute: product?.idAttribute,
                    priceImport: product?.price,
                    quantity: product?.quantity
                });

                const detailReceipts = await DetailReceipt
                    .find({ idProduct: product?.idProduct, idAttribute: product?.idAttribute }).lean()
                let totalPrice = 0
                let totalQuantity = 0
                detailReceipts?.map(item => {
                    totalPrice += item?.priceImport * item?.quantity,
                        totalQuantity += item?.quantity
                })
                const percentProfit = 20;
                console.log(totalPrice, totalQuantity)
                const priceBoughtForProduct = Math.floor(totalPrice / totalQuantity) * (1 + (percentProfit / 100))


                await ProductAttribute.updateOne(
                    {
                        idProduct: product?.idProduct,
                        idSize: product?.idAttribute
                    },
                    {
                        $set: {
                            priceBought: priceBoughtForProduct
                        },
                        $inc: {
                            quantity: product?.quantity,
                        }
                    }
                )
            }




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
                let { idUser, idSupplier, receiptDetails, ...restReceipt } = receipt
                receiptDetails = receiptDetails?.map(item => {
                    const { idProduct, idAttribute, ...restReceiptDetail } = item
                    return item = {
                        ...restReceiptDetail,
                        product: idProduct,
                        attribute: idAttribute
                    }
                })
                receipt = {
                    ...restReceipt,
                    user: idUser,
                    supplier: idSupplier,
                    receiptDetails
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


    static async updateReceipt(req, res, next) {

    }
}