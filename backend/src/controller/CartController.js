const Cart = require('../model/CartModel')


const addCart = async (req, res, next) => {
    try {
        const { idUser, idAttribute } = req.body
        const carts = await Cart.find({})
        const isCheckCartOfUser = carts.find(cart => {
            return cart.idUser.toString() === idUser && cart.idAttribute.toString() === idAttribute
        })
        let newCart;
        if(isCheckCartOfUser)
        {
            // console.log("isCheckCartOfUser", isCheckCartOfUser._id.toString())
            // await Cart.updateOne({_id : isCheckCartOfUser._id.toString()}, {
            //     idUser,
            //     idAttribute,
            //     quantity : isCheckCartOfUser.quantity + 1
            // })
            return res.status(400).json({
                message : "Sản phẩm đã được thêm vào giỏ hàng",
                status : 400
            })
        }
        else 
        {
            console.log("add success", "123")
            newCart = new Cart({ idUser, idAttribute })
            await newCart.save()
        }
        const idCart = isCheckCartOfUser ? isCheckCartOfUser._id.toString() : newCart._id
        console.log("idCart", idCart)
        let cart = await Cart.findOne({ _id: idCart })
            .populate({
                path: 'idAttribute',
                populate:
                    [
                        {
                            path: 'idProduct',
                            model: 'Product',
                            populate: {
                                path: 'idCategory',
                                model: 'Category'
                            }
                        },
                        {
                            path: 'idSize',
                            model: 'Size'

                        }
                    ]
            }).lean()

        if(cart.idAttribute && cart.idAttribute.idProduct)
        {
            cart.attribute = cart.idAttribute
            cart.idAttribute.product = cart.idAttribute.idProduct
            cart.idAttribute.idProduct.category = cart.idAttribute.idProduct.idCategory
            cart.idAttribute.size = cart.idAttribute.idSize
            delete cart.idAttribute.idProduct.idCategory
            delete cart.idAttribute.idSize
            delete cart.idAttribute.idProduct
            delete cart.idAttribute
        }



        return res.status(200).json({
            cart
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
            .populate({
                path: 'idAttribute',
                populate:
                    [
                        {
                            path: 'idProduct',
                            model: 'Product',
                            populate: {
                                path: 'idCategory',
                                model: 'Category'
                            }
                        },
                        {
                            path: 'idSize',
                            model: 'Size'

                        }
                    ]
            })
            .lean()

        carts = carts.map(cart => {
            if(cart.idAttribute && cart.idAttribute.idProduct && cart.idAttribute.idProduct.idCategory)
            {
                cart.idAttribute.idProduct.category = cart.idAttribute.idProduct.idCategory
            }
            if (cart.idAttribute && cart.idAttribute.idProduct) {
                cart.idAttribute.product = cart.idAttribute.idProduct;
            }
            if(cart.idAttribute && cart.idAttribute.idSize)
            {
                cart.idAttribute.size = cart.idAttribute.idSize
            }

            cart.attribute = cart.idAttribute;

            if (cart.idAttribute && cart.idAttribute.idProduct) {
                delete cart.idAttribute.idProduct.idCategory
                delete cart.idAttribute.idProduct;
                delete cart.idAttribute.idSize
                delete cart.idAttribute;
            }

            return cart;
        })

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