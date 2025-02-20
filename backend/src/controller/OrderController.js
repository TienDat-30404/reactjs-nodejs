

import Order from '../model/OrderModel.js';
import Cart from '../model/CartModel.js';
import Voucher from '../model/VoucherModel.js';
import Product from '../model/ProductModel.js';
import OrderDetail from '../model/OrderDetailModel.js';
import Notification from '../model/NotificationModel.js';
import mongoose from 'mongoose';
import Status from '../model/StatusModel.js';
export default class OrderController {

    static async addOrder(req, res, next) {
        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            const { idUser, totalPrice, address, phone, paymentMethod, products, useVoucher } = req.body
            // order
            const [isCheckOrderOfUser, defaultStatus] = await Promise.all([
                await Order.find({ idUser: idUser }).lean(),
                await Status.findOne({ name: 'pending' })
            ])
            const newOrder = new Order(
                {
                    idUser,
                    totalPrice,
                    address,
                    phone,
                    idPaymentMethod: paymentMethod,
                    idStatus: defaultStatus?._id.toString(),
                    products,
                    idVoucher: useVoucher[0]?._id
                })
            const savedOrder = await newOrder.save()

            // orderDetail
            const orderDetails = products.map(product => {
                return {
                    idOrder: newOrder._id,
                    idAttribute: product.attribute._id,
                    quantity: product.quantity
                }
            })
            await OrderDetail.insertMany(orderDetails)

            // cart
            const cartIds = products.map(product => product._id)
            await Cart.deleteMany({ _id: { $in: cartIds } })
            // delete voucher when use 
            if (useVoucher?.length > 0) {
                const voucher = await Voucher.updateOne({ _id: useVoucher[0]?._id }, {
                    status: 0
                })
            }

            //  add voucher && add notification when receive voucher
            let totalPriceOrderOfUser = 0
            if (isCheckOrderOfUser && isCheckOrderOfUser.length > 0) {
                totalPriceOrderOfUser = isCheckOrderOfUser.reduce((sum, order) => sum + (order.totalPrice), totalPrice)
            }
            else {
                totalPriceOrderOfUser = totalPrice
            }

            let vouchersOfUser = await Voucher.find({ idUser: idUser });
            const priceRewardVoucher = 1000000;
            let currentDiscount = vouchersOfUser?.length > 0
                ? vouchersOfUser[vouchersOfUser.length - 1]?.discountVoucher
                : 0.5;
            let voucherAdded = []
            let notificationAdded = []
            for (var i = 1; i <= (Math.floor(totalPriceOrderOfUser) / priceRewardVoucher) - vouchersOfUser?.length; i++) {
                currentDiscount += 0.5;

                const voucher = new Voucher({
                    idUser,
                    discountVoucher: currentDiscount.toFixed(3),
                    description: "giảm giá "
                        + ((currentDiscount).toFixed(1))
                        + "% khi mua hàng đạt mốc " + (vouchersOfUser?.length + i)
                        + " triệu "
                });
                await voucher.save();
                voucherAdded.push(voucher)


                const notification = new Notification({
                    idUser,
                    content: "Chúc mừng bạn nhận được voucher giảm giá " +
                        ((currentDiscount).toFixed(1))
                        + "% khi mua hàng đạt mốc " + (vouchersOfUser?.length + i)
                        + " triệu ",
                    type : 'personal',
                    isRead : false
                })
                notificationAdded.push(notification)
                await notification.save()
            }

            let order = await Order.find({ _id: savedOrder?._id.toString() })
                .populate('idUser')
                .populate('idStaff')
                .populate('idVoucher')
                .populate('idStatus')
                .populate('idPaymentMethod')
                .populate({
                    path: 'orderDetails',
                    populate: {
                        path: 'idAttribute',
                        model: 'ProductAttribute',
                        populate: [
                            {
                                path: 'idProduct',
                                model: 'Product'
                            },
                            {
                                path: 'idSize',
                                model: 'Size'
                            }
                        ]

                    }
                })
                .lean()

            order = order.map(order => {

                order.user = order.idUser
                order.staff = order.idStaff
                order.voucher = order.idVoucher
                order.status = order.idStatus
                order.paymentMethod = order.idPaymentMethod

                order.orderDetails.map((item, index) => {
                    if (item?.idAttribute && item?.idAttribute.idProduct && item?.idAttribute?.idSize) {
                        console.log(index, item.idAttribute)
                        item.idAttribute.product = item.idAttribute.idProduct
                        item.idAttribute.size = item.idAttribute.idSize

                        delete item.idAttribute.idProduct
                        delete item.idAttribute.idSize
                    }
                    item.attribute = item.idAttribute
                    delete item.idAttribute
                })

                delete order.idUser
                delete order.idStaff
                delete order.idVoucher
                delete order.idStatus
                delete order.idPaymentMethod
                return order
            })

            await session.commitTransaction()
            session.endSession()
            return res.status(200).json(
                {
                    voucherAdded,
                    notificationAdded,
                    order,
                    status: 201,
                    newOrder
                })
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    static async getAllOrder(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const startPage = (page - 1) * limit
        const objectFilter = { deletedAt: null }
        if (req.query.idOrder) {
            if (mongoose.Types.ObjectId.isValid(req.query.idOrder)) {
                objectFilter._id = req.query.idOrder
            }
            else {
                return res.status(200).json({
                    page: '',
                    totalPage: '',
                    limit: '',
                    totalOrder: '',
                    orders: [],
                    status: 200
                })
            }
        }
        if(req.query.status)
        {
            if (mongoose.Types.ObjectId.isValid(req.query.status)) {
                objectFilter.idStatus = req.query.status
            }
            else {
                return res.status(200).json({
                    page: '',
                    totalPage: '',  
                    limit: '',
                    totalOrder: '',
                    orders: [],
                    status: 200
                })
            }
        }
        let [orders, totalOrder] = await Promise.all([
            await Order.find(objectFilter)
                .skip(startPage)
                .limit(limit)
                .populate('idUser')
                .populate('idStaff')
                .populate('idVoucher')
                .populate('idStatus')
                .populate('idPaymentMethod')
                .populate({
                    path: 'orderDetails',
                    populate: {
                        path: 'idAttribute',
                        model: 'ProductAttribute',
                        populate: [
                            {
                                path: 'idProduct',
                                model: 'Product',
                                populate : {
                                    path : 'discount',
                                    model : 'Discount'
                                }
                            },
                            {
                                path: 'idSize',
                                model: 'Size'
                            }
                        ]

                    }
                })
                .lean(),
            await Order.countDocuments(objectFilter)
        ])

        orders = orders.map(order => {

            order.user = order.idUser
            order.staff = order.idStaff
            order.voucher = order.idVoucher
            order.status = order.idStatus
            order.paymentMethod = order.idPaymentMethod

            order.orderDetails.map((item, index) => {
                if (item?.idAttribute && item?.idAttribute.idProduct && item?.idAttribute?.idSize) {
                    console.log(index, item.idAttribute)
                    item.idAttribute.product = item.idAttribute.idProduct
                    item.idAttribute.size = item.idAttribute.idSize

                    delete item.idAttribute.idProduct
                    delete item.idAttribute.idSize
                }
                item.attribute = item.idAttribute
                delete item.idAttribute
            })

            delete order.idUser
            delete order.idStaff
            delete order.idVoucher
            delete order.idStatus
            delete order.idPaymentMethod
            return order
        })
        const totalPage = Math.ceil(totalOrder / limit)


        return res.status(200).json(
            {
                orders,
                page,
                limit,
                totalPage,
                totalOrder,
                status: 200
            })
    }

    static async detailOrder(req, res, next) {
        try {
            const idOrder = req.params.idOrder;

            const orderDetails = await OrderDetail.find({ idOrder: idOrder });

            const detailOrder = await Promise.all(
                orderDetails.map(async (item) => {
                    const product = await Product.findOne({ idProduct: item.idProduct });
                    return {
                        ...item._doc,
                        product: product
                    };
                })
            );

            // Trả về chi tiết đơn hàng kèm thông tin sản phẩm
            return res.status(200).json({ detailOrder });
        } catch (error) {
            console.error('Error fetching order details:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };


    static async confirmOrder(req, res, next) {
        const idOrder = req.params.idOrder;
        const { status, staff } = req.body;

        try {
            let order = await Order.findByIdAndUpdate({ _id: idOrder }, {
                idStatus: status,
                idStaff: staff
            }, { new: true }
            ).populate('idStaff')
                .populate('idStatus')
                .lean()

            if (order) {
                order.staff = order.idStaff
                order.status = order.idStatus
                delete order.idStaff
                delete order.idStatus
            }

            return res.status(200).json(
                {
                    order,
                    status: 200
                }
            )
        }
        catch (error) {
            return res.status(500).json({
                message: `Fail when confirm order : ${error}`
            })
        }
    }

}

