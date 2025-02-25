// const Cart = require('../model/CartModel')
import Cart from '../model/CartModel.js'
export default class CartController {

    static async addCart(req, res, next) {
        try {
            const { idUser, idProductAttribute } = req.body
            const carts = await Cart.find({})
            const isCheckCartOfUser = carts.find(cart => {
                return cart.idUser.toString() === idUser && cart.idProductAttribute.toString() === idProductAttribute
            })
            let newCart;
            if (isCheckCartOfUser) {
              
                return res.status(400).json({
                    message: "Sản phẩm đã được thêm vào giỏ hàng",
                    status: 400
                })
            }
            else {
                newCart = new Cart({ idUser, idProductAttribute })
                await newCart.save()
            }
            const idCart = isCheckCartOfUser ? isCheckCartOfUser._id.toString() : newCart._id
            let cart = await Cart.findOne({ _id: idCart })
                .populate({
                    path: 'idProductAttribute',
                    populate:
                        [
                            {
                                path: 'idProduct',
                                model: 'Product',
                                populate: [
                                    {
                                        path: 'discount',
                                        model: 'Discount'
                                    },
                                    {
                                        path: 'idCategory',
                                        model: 'Category'
                                    }
                                ]
                            },
                            {
                                path: 'idSize',
                                model: 'Size'
    
                            }
                        ]
                }).lean()
    
            if (cart.idProductAttribute && cart.idProductAttribute.idProduct) {
                cart.attribute = cart.idProductAttribute
                cart.idProductAttribute.product = cart.idProductAttribute.idProduct
                cart.idProductAttribute.idProduct.category = cart.idProductAttribute.idProduct.idCategory
                cart.idProductAttribute.size = cart.idProductAttribute.idSize
                delete cart.idProductAttribute.idProduct.idCategory
                delete cart.idProductAttribute.idSize
                delete cart.idProductAttribute.idProduct
                delete cart.idProductAttribute
            }
    
    
    
            return res.status(200).json({
                cart
            });
        }
        catch (error) {
            next(error)
        }
    }
    static async getAllCart(req, res, next)  {
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
                    path: 'idProductAttribute',
                    populate:
                        [
                            {
                                path: 'idProduct',
                                model: 'Product',
                                populate: [
                                    {
                                        path: 'discount',
                                        model: 'Discount'
                                    },
                                    {
                                        path: 'idCategory',
                                        model: 'Category'
                                    }
                                ]
    
                            },
                            {
                                path: 'idSize',
                                model: 'Size'
    
                            }
                        ]
                })
                .lean()
    
            carts = carts.map(cart => {
                const {idProductAttribute, ...restCart} = cart
                const {idProduct, idSize, ...restProductAttribute} = idProductAttribute 
                const {idCategory, ...restProduct} = idProduct 

                cart = {
                    ...restCart,
                    productAttribute : {
                        ...restProductAttribute,
                        product : {
                            ...restProduct,
                            category : idCategory
                        },
                        size : idSize
                        
                    }
                }
                return cart

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
    
    static async deleteCart(req, res, next)  {
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
    static async updateQuantityCart(req, res, next)  {
        try {
            const idCart = req.params.idCart
            const { quantity } = req.body
            const result = await Cart.updateOne({ _id: idCart }, { $set: { quantity: quantity } })
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Cập nhật số lượng thành công",
                    status : 200
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
    
    static async getAllCartWhichNoPaginated(req, res, next)  {
        const idUser = req.params.idUser;
        const carts = await Cart.find({ idUser: idUser })
        return res.status(200).json({ carts })
    }
}

