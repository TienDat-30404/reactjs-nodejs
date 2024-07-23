const Product = require('../model/ProductModel')
const {validateNameProduct, validatePriceProduct, validateTypeQuantityProduct, validateQuantityProductBiggerZero, 
validateNameProductWhenUpdate} = require('../utils/validate')
const validateAddProduct = async (req, res, next) => {
    const {name, image, price, quantity, idCategory, description} = req.body
    const isCheckExistNameProduct = await validateNameProduct(name)
    if(!isCheckExistNameProduct)
    {
        return res.status(400).json({
            message : "Tên sản phẩm đã tồn tại"
        })
    }
    if(!validatePriceProduct(price))
    {
        return res.status(400).json({
            message : "Giá sản phẩm phải là một số"
        })
    }
    if(!validateTypeQuantityProduct(Number(quantity)))
    {
        return res.status(400).json({
            message : "Số lượng sản phẩm phải là một số nguyên"
        })
    }
    if(!validateQuantityProductBiggerZero(quantity))
    {
        return res.status(400).json({
            message : "Số lượng phải lớn hơn hoặc bằng 0"
        })
    }
    
    next()
}

// validate update product
const validateUpdateProduct = async (req, res, next) => {
    const {name, image, price, quantity, idCategory, description} = req.body
    const idProduct = req.params.idProduct
    if(!validateNameProductWhenUpdate(idProduct, name))
    {
        return res.status(400).json({
            message : "Tên sản phẩm đã tồn tại"
        })
    }
    if(!validatePriceProduct(price))
    {
        return res.status(400).json({
            message : "Giá sản phẩm phải là một số"
        })
    }
    if(!validateTypeQuantityProduct(Number(quantity)))
    {
        return res.status(400).json({
            message : "Số lượng sản phẩm phải là một số nguyên"
        })
    }
    if(!validateQuantityProductBiggerZero(quantity))
    {
        return res.status(400).json({
            message : "Số lượng phải lớn hơn hoặc bằng 0"
        })
    }
    
    
    next()
}
module.exports = {validateAddProduct, validateUpdateProduct}