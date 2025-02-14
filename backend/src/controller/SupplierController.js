import Supplier from "../model/SupplierModel.js"
import DetailSupplier from "../model/DetailSupplier.js"
import mongoose from "mongoose"
export class SupplierController {

    static async getAllSupplier(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            const objectFilter = { deletedAt: null }
            if (req.query.idSupplier) {
                if (mongoose.Types.ObjectId.isValid(req.query.idSupplier)) {
                    objectFilter._id = req.query.idSupplier
                } else {
                    return res.json({
                        suppliers: [],
                        page: 1,
                        totalSupplier: 0,
                        totalPage: 0,
                        limit: 0,
                        status: 200
                    });
                }
            }
            if(req.query.name)
            {
                objectFilter.name = {$regex : req.query.name, $options : 'i'}
            }
            let [suppliers, totalSupplier] = await Promise.all([
                Supplier.find(objectFilter)
                    .skip(startPage)
                    .limit(limit)
                    .populate({
                        path: 'supplierDetails',
                        match: { deletedAt: null },
                        populate: {
                            path: 'idProduct',
                            model: 'Product'
                        }
                    }).lean(),
                Supplier.countDocuments(objectFilter)
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
            const { name, phone, address, email, products } = req.body

            await Supplier.findByIdAndUpdate(idSupplier,
                {
                    name,
                    phone,
                    address,
                    email
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            if (products?.length > 0) {
                await Promise.all(products?.map((product) =>
                    DetailSupplier.findOneAndUpdate(
                        {
                            idSupplier,
                            idProduct: product?.idProduct
                        },
                        {
                            $set: { price: product?.price }
                        },
                        {
                            new: true,
                            upsert: true
                        }
                    )
                ))
            }

            const dataUpdate = await Supplier.findOne({ _id: idSupplier })
                .populate({
                    path: 'supplierDetails',
                    populate: {
                        path: 'idProduct',
                        model: 'Product'
                    }
                }).lean()

            if (dataUpdate && dataUpdate?.supplierDetails?.length > 0) {
                dataUpdate?.supplierDetails?.map(item => {
                    item.product = item.idProduct
                    delete item.idProduct
                    return item
                })
            }
            return res.status(200).json({
                message: "Update Supplier Successfully",
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
            const [supplier, detailSuppliers] = await Promise.all([
                Supplier.deleteOne(
                    {
                        _id: idSupplier,
                    },
                    {
                        deletedAt: new Date()
                    }
                ),
                DetailSupplier.deleteMany(
                    {
                        idSupplier
                    },
                    {
                        deletedAt: new Date()
                    }
                )
            ])
            console.log(supplier)
            console.log(detailSuppliers)
            if (supplier.deletedCount > 0 && detailSuppliers.deletedCount > 0) {
                return res.status(200).json({
                    message: "Xóa nhà cung cấp thành công",
                    status: 200
                })
            }

        }
        catch (error) {
            return res.status(500).json({ message: `Fail when delete supplier : ${error}` })
        }
    }

    static async deleteProductOfSupplier(req, res, next) {
        const { idSupplier, idProduct } = req.body
        const result = await DetailSupplier.deleteOne(
            {
                idSupplier,
                idProduct
            },
            {
                deletedAt: new Date()
            }
        )
        return res.status(200).json({
            status: 200,
            result
        })
    }


}