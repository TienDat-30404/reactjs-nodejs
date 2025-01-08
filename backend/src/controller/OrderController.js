// const Order = require('../model/OrderModel')
// const Cart = require('../model/CartModel')
// const Voucher = require('../model/VoucherModel')
// const Product = require('../model/ProductModel')
// const OrderDetail = require('../model/OrderDetailModel')
// const Notification = require('../model/NotificationModel')
// const { default: mongoose } = require('mongoose')

import Order from '../model/OrderModel.js';
import Cart from '../model/CartModel.js';
import Voucher from '../model/VoucherModel.js';
import Product from '../model/ProductModel.js';
import OrderDetail from '../model/OrderDetailModel.js';
import Notification from '../model/NotificationModel.js';
import mongoose from 'mongoose';
export default class OrderController {
    
    static async addOrder(req, res, next)  {
        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            const { idUser, totalPrice, address, phone, paymentMethod, bankAccount, products, useVoucher } = req.body
            // order
            const orders = await Order.find({ idUser: idUser }).lean();
            const newOrder = new Order({ idUser, totalPrice, address, phone, paymentMethod, bankAccount, products, idVoucher: useVoucher[0]?._id })
            await newOrder.save()
    
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
            if (orders && orders.length > 0) {
                totalPriceOrderOfUser = orders.reduce((sum, order) => sum + (order.totalPrice), totalPrice)
            }
            else {
                totalPriceOrderOfUser = totalPrice
            }
    
            let vouchersOfUser = await Voucher.find({ idUser: idUser });
            const priceRewardVoucher = 1000000;
            let currentDiscount = vouchersOfUser?.length > 0
                ? vouchersOfUser[vouchersOfUser.length - 1]?.discountVoucher
                : 0.005;
            let voucherAdded = []
            let notificationAdded = []
            for (var i = 1; i <= (Math.floor(totalPriceOrderOfUser) / priceRewardVoucher) - vouchersOfUser?.length; i++) {
                currentDiscount += 0.005;
    
                const voucher = new Voucher({
                    idUser,
                    discountVoucher: currentDiscount.toFixed(3),
                    description: "giảm giá "
                        + ((currentDiscount * 100).toFixed(1))
                        + "% khi mua hàng đạt mốc " + (vouchersOfUser?.length + i)
                        + " triệu "
                });
                await voucher.save();
                voucherAdded.push(voucher)
                
    
                const notification = new Notification({
                    idUser,
                    content: "Chúc mừng bạn nhận được voucher giảm giá " +
                        ((currentDiscount * 100).toFixed(1))
                        + "% khi mua hàng đạt mốc " + (vouchersOfUser?.length + i)
                        + " triệu "
                })
                notificationAdded.push(notification)
                await notification.save()
            }
    
    
            await session.commitTransaction()
            session.endSession()
            return res.status(200).json({ newOrder, orderDetails, voucherAdded, notificationAdded, status : 201 })
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }
    
    static async getAllOrder(req, res, next) {
        let orders = await Order.find({})
            .populate('idUser')
            .populate('idStaff')
            .populate('idVoucher')
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
    
        orders = orders.map(order => {
    
            order.user = order.idUser
            order.staff = order.idStaff
            order.voucher = order.idVoucher
    
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
            return order
        })
    
    
        return res.status(200).json({ orders })
    }
    
    static async detailOrder(req, res, next)  {
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
        const { isStatus, idStaff } = req.body;
        var data
        if (isStatus === "Success" || isStatus === "Cancel") {
            data = {
                isStatus: isStatus,
                idStaff: idStaff,
            }
        }
        else {
            data = {
                isStatus: isStatus,
                idStaff: null
            }
        }
        try {
            const response = await Order.updateOne({ idOrder: idOrder }, data)
            return res.status(200).json({ response })
        }
        catch (error) {
            next(error)
        }
    }

}    

