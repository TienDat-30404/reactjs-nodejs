const Cart = require('../model/CartModel')
const Product = require('../model/ProductModel')
// [GET] /add-product
const addCart = async (req, res, next) => {
    try 
    {
        const {idUser, idProduct, quantity} = req.body
        console.log(idUser)
        const newCart = new Cart({idUser, idProduct, quantity})
        await newCart.save()
        return res.status(200).json(newCart)
    }
    catch(error)
    {
        next(error)
    }
}
const getAllCart = async (req, res, next) => {
    const idUser = req.query.idUser
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startPage = (page - 1) * limit
    const sortBy = req.query.sortBy || 'idCart'
    const type = req.query.type === "asc" ? 1 : -1
    const objectSort = {}
    objectSort[sortBy] = type
    console.log(objectSort)
    const cart = await Cart.find({ idUser: idUser })
                           .skip(startPage)
                           .limit(limit)
                           .sort(objectSort)
    console.log(cart)
    const totalProductInCart = (await Cart.find({idUser : idUser})).length
    const totalPages = Math.ceil(totalProductInCart / limit)
    
    const listCart = await Promise.all(
        cart.map(async (cartItem) => {
            const quantityCart = cartItem.quantity
            const product = await Product.findOne({ idProduct: cartItem.idProduct })               
            product.quantity = cartItem.quantity
            return {...product._doc, quantityCart : quantityCart} 
        })
        
    );

    return res.status(200).json({
        listCart, 
        totalPages, 
        page, 
        totalProductInCart
    });
};
// detail category 


module.exports = {addCart, getAllCart}