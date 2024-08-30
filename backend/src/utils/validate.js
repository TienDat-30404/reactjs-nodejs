const Product = require('../model/ProductModel')
const Category = require('../model/CategoryModel')
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
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
const validateNameProduct = async (name) => {
    const existNameProduct = await Product.findOne({ name })
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


// validate Name Product When handle update
const validateNameProductWhenUpdate = async (id, name) => {
    const countNameProduct = await Product.countDocuments({ name })
    const isCheckNameProduct = await Product.findOne({ idProduct: id })
    return countNameProduct == 1 && (name != isCheckNameProduct.name)
}

// validate name category
const isCheckExistNameCategory = async (name) => {
    const existNameCategory = await Category.findOne({ name })
    return !existNameCategory
}


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Đặt thư mục lưu ảnh trong dự án của bạn
//         cb(null, path.join(__dirname, 'uploads/images'));
//     },
//     filename: function (req, file, cb) {
//         // Đổi tên file để tránh trùng lặp
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });
module.exports = {
    validateEmail, hashPassword, validateNameProduct, validatePriceProduct, validateTypeQuantityProduct,
 validateNameProductWhenUpdate, isCheckExistNameCategory
}
