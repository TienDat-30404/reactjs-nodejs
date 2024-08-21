const Bill = require('../model/BillModel')
const Cart = require('../model/CartModel')
const BillDetail = require('../model/BillDetailModel')
const { default: mongoose } = require('mongoose')
const addBill = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const {idUser, totalPrice, address, phone, paymentMethod, bankAccount, products} = req.body
        const newBill = new Bill({idUser, totalPrice, address, phone, paymentMethod, bankAccount, products})
        await newBill.save()
        const billDetails = products.map(product => {
            return {
                idBill : newBill.idBill,
                idProduct : product.idProduct,
                quantity : product.quantityCart
            }
        })
        await BillDetail.insertMany(billDetails)

        const cartIds = products.map(product => product.idCart)
        await Cart.deleteMany({ idCart : { $in: cartIds } })

        await session.commitTransaction()
        session.endSession()
        return res.status(200).json({newBill, billDetails})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}



module.exports = {addBill}