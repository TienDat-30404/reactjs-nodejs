const Product = require('../model/ProductModel')
const { validateNameProduct, validatePriceProduct, validateTypeQuantityProduct, validateQuantityProductBiggerZero,
    validateNameProductWhenUpdate } = require('../utils/validate')
const validateAddProduct = async (req, res, next) => {
    const { name, price, quantity, idCategory, description } = req.body
    
    const isCheckExistNameProduct = await validateNameProduct(name)
    const errors = {}
    if (name.trim() == "") {
        errors.name = "Vui lòng nhập tên sản phẩm"
    }
    else {
        if (!isCheckExistNameProduct) {
            errors.name = "Tên sản phẩm đã tồn tại"
        }
    }
    if (!req.file) {
        errors.image = "Vui lòng chọn ảnh"
    }
    if (price.trim() === "") {
        errors.price = "Vui lòng nhập giá sản phẩm"
    }
    else {
        if (!validatePriceProduct(price) && price != "") {
            errors.price = "Giá sản phẩm không hợp lệ"
        }
    }
    if (quantity.trim() === "") {
        errors.quantity = "Vui lòng nhập số lượng sản phẩm"
    }
    else if (!validateTypeQuantityProduct(Number(quantity)) && quantity.trim() === "") {
        errors.quantity = "Số lượng sản phẩm không hợp lệ"
    }
    if (idCategory == 0) {
        errors.idCategory = "Vui lòng chọn thể loại sản phẩm"
    }
    if (description == "") {
        errors.description = "Vui lòng nhập mô tả sản phẩm"
    }


    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}

// validate update product
const validateUpdateProduct = async (req, res, next) => {
    const { name, image, price, quantity, idCategory, description } = req.body
    const idProduct = req.params.idProduct
    const errors = {}
    if (name == "") {
        errors.name = "Vui lòng nhập tên sản phẩm"
    }

    if (!validateNameProductWhenUpdate(idProduct, name)) {
        errors.name = "Tên sản phẩm đã tồn tại"
    }
    if (!validatePriceProduct(price)) {
        errors.price = "Giá sản phẩm không hợp lệ"
    }


    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    next()
}
module.exports = { validateAddProduct, validateUpdateProduct }