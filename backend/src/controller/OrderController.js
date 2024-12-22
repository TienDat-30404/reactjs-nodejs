const Order = require('../model/OrderModel')
const Cart = require('../model/CartModel')
const Product = require('../model/ProductModel')
const OrderDetail = require('../model/OrderDetailModel')
const { default: mongoose } = require('mongoose')
const addOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const { idUser, totalPrice, address, phone, paymentMethod, bankAccount, products } = req.body
        const newOrder = new Order({ idUser, totalPrice, address, phone, paymentMethod, bankAccount, products })
        await newOrder.save()
        const orderDetails = products.map(product => {
            return {
                idOrder: newOrder._id,
                idAttribute: product.attribute._id,
                quantity: product.quantity
            }
        })
        await OrderDetail.insertMany(orderDetails)
        const cartIds = products.map(product => product._id)
        await Cart.deleteMany({ _id: { $in: cartIds } })

        await session.commitTransaction()
        session.endSession()
        return res.status(200).json({ newOrder, orderDetails })
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

const getAllOrder = async (req, res, next) => {
    const orders = await Order.find({})
    return res.status(200).json({ orders })
}

const detailOrder = async (req, res, next) => {
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


const confirmOrder = async (req, res, next) => {
    const idOrder = req.params.idOrder;
    const { isStatus, idStaff } = req.body;
    var data
    if (isStatus === "Success" || isStatus === "Cancel") {
        data = {
            isStatus: isStatus,
            idStaff: idStaff,
        }
    }
    else 
    {
        data = {
            isStatus : isStatus,
            idStaff : null
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


module.exports = { addOrder, getAllOrder, detailOrder, confirmOrder }