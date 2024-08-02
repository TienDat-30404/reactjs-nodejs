const Product = require('../model/ProductModel')
const Category = require('../model/CategoryModel')
const bcrypt = require('bcrypt')
// Check email 
const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

// validate password


const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

// validate Name Product
const validateNameProduct = async (name) => 
{
    const existNameProduct = await Product.findOne({name})
    return !existNameProduct
}

// validate Price Product 
const validatePriceProduct = (price) => {
    const isCheckTypeOfPrice = Number(price)
    return isCheckTypeOfPrice
}

// valitdate TypeOf Quantity Product
const validateTypeQuantityProduct = (quantity) => {
    const isCheckTypeOfQuantity = Number.isInteger(quantity)
    return isCheckTypeOfQuantity
}

// validate Quantity Product > 0
const validateQuantityProductBiggerZero = (quantity) => {
    const quantityProductBiggerZero = Number(quantity) >= 0
    return quantityProductBiggerZero
}

// validate Name Product When handle update
const validateNameProductWhenUpdate = async (id, name) => {
    const countNameProduct = await Product.countDocuments({name})
    const isCheckNameProduct = await Product.findOne({idProduct : id})
    return countNameProduct == 1 && (name != isCheckNameProduct.name)
}

// validate name category
const isCheckExistNameCategory = async (name) => 
    {
        const existNameCategory = await Category.findOne({name})
        return !existNameCategory
    }

module.exports = {validateEmail, hashPassword, validateNameProduct, validatePriceProduct, validateTypeQuantityProduct,
    validateQuantityProductBiggerZero, validateNameProductWhenUpdate, isCheckExistNameCategory
}
