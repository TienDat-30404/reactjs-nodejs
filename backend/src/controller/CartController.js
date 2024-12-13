const Cart = require('../model/CartModel')
const Product = require('../model/ProductModel')
const Category = require('../model/CategoryModel')
// [GET] /add-product
const addCart = async (req, res, next) => {
    try {
        const { idUser, idProduct, quantity } = req.body
        const newCart = new Cart({ idUser, idProduct, quantity })
        await newCart.save()
        const populatedCart = await Cart.findById(newCart._id).populate('idProduct');

        return res.status(200).json({
            idUser: populatedCart.idUser,
            product: populatedCart.idProduct,
            quantity: populatedCart.quantity,
        });
    }
    catch (error) {
        next(error)
    }
}
const getAllCart = async (req, res, next) => {
    try {
        const idUser = req.query.idUser
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const startPage = (page - 1) * limit
        const sortBy = req.query.sortBy || 'idCart'
        const type = req.query.type === "asc" ? 1 : -1
        const objectSort = {}
        objectSort[sortBy] = type
        let carts;
        carts = await Cart.find({ idUser: idUser })
            .skip(startPage)
            .limit(limit)
            .sort(objectSort)
            .populate('idProduct')
            .lean()

        for (const cart of carts) {
            if (cart.idProduct) {
                cart.product = cart.idProduct;
                delete cart.idProduct;

                if (cart.product && cart.product.idCategory) {
                    const category = await Category.findById(cart.product.idCategory); 
                    cart.product.category = category;
                    delete cart.product.idCategory
                }
            }
        }

        const totalProductInCart = (await Cart.find({ idUser: idUser })).length
        const totalPage = Math.ceil(totalProductInCart / limit)


        return res.status(200).json({
            carts,
            totalPage,
            page,
            limit,
            totalProductInCart
        });
    }
    catch (error) {
        next(error)
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const idCart = req.params._id
        const result = await Cart.deleteOne({ _id: idCart })
        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: "Xóa thành công"
            })
        }
    }
    catch (error) {
        next(error)
    }
}
// update quantity cart
const updateQuantityCart = async (req, res, next) => {
    try {
        const idCart = req.params.idCart
        const { quantity } = req.body
        const result = await Cart.updateOne({ _id: idCart }, { $set: { quantity: quantity } })
        if (result.modifiedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Cập nhật số lượng thành công"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Cập nhật số lượng thất bại"
            })
        }
    }
    catch (error) {
        next(error)
    }
}

const getAllCartWhichNoPaginated = async (req, res, next) => {
    const idUser = req.params.idUser;
    const carts = await Cart.find({ idUser: idUser })
    return res.status(200).json({ carts })
}

module.exports = { addCart, getAllCart, deleteCart, updateQuantityCart, deleteCart, getAllCartWhichNoPaginated }