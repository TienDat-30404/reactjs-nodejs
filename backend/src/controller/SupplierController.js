import Supplier from "../model/SupplierModel.js"
import DetailSupplier from "../model/DetailSupplier.js"
import mongoose from "mongoose"
export class SupplierController {

    static async getAllSupplier(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            let [suppliers, totalSupplier] = await Promise.all([
                Supplier.find({})
                    .skip(startPage)
                    .limit(limit)
                    .populate({
                        path: 'supplierDetails',
                        populate: {
                            path: 'idProduct',
                            model: 'Product'
                        }
                    }).lean(),
                Supplier.countDocuments()
            ])

            if (suppliers && suppliers?.length > 0) {
                suppliers = suppliers.map(supplier => {
                    supplier?.supplierDetails?.map(item => {
                        item.product = item.idProduct
                        delete item.idProduct
                    })
                    return supplier
                })

            }
            const totalPage = Math.ceil(totalSupplier / limit)
            return res.status(200).json({
                suppliers,
                page,
                limit,
                totalSupplier,
                totalPage,
                status: 200
            })
        }
        catch (err) {
            return res.status(500).json({
                message: `Fail when get all supplier : ${err}`
            })
        }
    }

    static async addSupplier(req, res, next) {
        try {
            const { name, phone, address, email, products } = req.body
            const savedSupplier = new Supplier({
                name,
                phone,
                address,
                email
            })
            await savedSupplier.save()
            const detailSupplier = await Promise.all(
                products.map((product) => {
                    return DetailSupplier.create({
                        idSupplier: savedSupplier?._id.toString(),
                        idProduct: product.idProduct,
                        price: product.price
                    })
                })
            )

            let supplier = await Supplier.findOne({ _id: savedSupplier?._id.toString() })
                .populate({
                    path: 'supplierDetails',
                    populate: {
                        path: 'idProduct',
                        model: 'Product'
                    }
                }).lean()

            if (supplier) {
                if (supplier?.supplierDetails?.length > 0) {
                    supplier?.supplierDetails?.map(item => {
                        item.product = item.idProduct
                        delete item.idProduct
                    })
                }
            }
            return res.status(200).json({
                supplier,
                status: 201
            })
        }
        catch (err) {
            return res.status(500).json({
                message: `Fail when add supllier : ${err}`
            })
        }
    }

    static async updateSupplier(req, res, next) {
        try {
            const idSupplier = req.params.idSupplier
            if (!mongoose.Types.ObjectId.isValid(idSupplier)) {
                return res.status(400).json({ message: "Invalid Supplier ID" });
            }
            const { name, phone, address, email } = req.body
            const dataUpdate = await Supplier.findByIdAndUpdate(idSupplier,
                {
                    name,
                    phone,
                    address,
                    email
                }, {
                new: true,
                runValidators: true,
            })
            return res.status(200).json({
                message: "Update Successfully",
                dataUpdate,
                status: 200
            })
        }
        catch (error) {
            return res.status(500).json({
                message: `Fail when update supplier : ${error}`
            })
        }
    };

    static async deleteSupplier(req, res, next) {
        try {
            const idSupplier = req.params.idSupplier
            const supplier = await Supplier.deleteOne({ _id: idSupplier })
            if (supplier.deletedCount > 0) {
                return res.status(200).json({
                    supplier,
                    message: "Xóa nhà cung cấp thành công",
                    status: 200
                })
            }

        }
        catch (error) {
            return res.status(500).json({ message: `Fail when delete supplier : ${error}` })
        }
    }
}