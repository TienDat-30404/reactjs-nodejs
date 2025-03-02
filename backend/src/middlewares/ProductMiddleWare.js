
import Product from '../model/ProductModel.js';
import Size from '../model/SizeModel.js';

const validateAddProduct = async (req, res, next) => {
    let { name, idCategory, description, sizes } = req.body

    const isCheckExistNameProduct = await Product.countDocuments({name})
    const errors = {}
    if (name.trim() == "") {
        errors.name = "Vui lòng nhập tên sản phẩm"
    }
    else {
        if (isCheckExistNameProduct > 0) {
            errors.name = "Tên sản phẩm đã tồn tại"
        }
    }
    // if (!req.file) {
    //     errors.image = "Vui lòng chọn ảnh"
    // }

    if (idCategory == 0) {
        errors.idCategory = "Vui lòng chọn thể loại sản phẩm"
    }
    if (description == "") {
        errors.description = "Vui lòng nhập mô tả sản phẩm"
    }
    const allSize = await Size.find({})
    if (sizes.length == 0) {
        errors.size = "Vui lòng chọn thuộc tính sản phẩm"
    }
    else {
        const isCheckSize = sizes.every(size => !allSize.some(item => item._id.toString() === size))
        if (isCheckSize) {
            errors.size = "Thuộc tính không hợp lệ"
        }
    }


    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }


    next()
}

// validate update product
const validateUpdateProduct = async (req, res, next) => {
    const idProduct = req.params._id
    if (!idProduct) {
        return res.status(404).json({ message: "Id không tìm thấy" })
    }
    const { name, idCategory, description, sizes } = req.body

    const product = await Product.findOne({ _id: idProduct })
        .populate('idCategory')
        .populate({
            path: 'productAttributes',
            populate: {
                path: 'idSize',
                model: 'Size',
            },
        })
        .lean();
    const errors = {}
    if (name.trim() == "") {
        errors.name = "Vui lòng nhập tên sản phẩm"
    }
    else {

        const isExistName = await Product.findOne({name, _id : {$ne : idProduct}})
        if(isExistName)
        {
             errors.name = "Tên sản phẩm đã tồn tại"
        }
    }
 
    if (idCategory == 0) {
        errors.idCategory = "Vui lòng chọn thể loại sản phẩm"
    }
    if (description == "") {
        errors.description = "Vui lòng nhập mô tả sản phẩm"
    }
    if (sizes) {
        if (!Array.isArray(sizes) || sizes.length === 0) {
            errors.sizes = "Dữ liệu thuộc tính không hợp lệ"
        }

        const isExistAttribute = product.productAttributes.map(attr => attr.idSize._id.toString())
        const newSizes = sizes.filter(size => !isExistAttribute.includes(size))
        req.body.sizes = newSizes
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}

const validateDeleteProduct = async (req, res, next) => {
    const idProduct = req.params.idProduct
    const product = await Product.findOne({ _id: idProduct })
        .populate('idCategory')
        .populate({
            path: 'productAttributes',
            populate: {
                path: 'idSize',
                model: 'Size'
            }
        })
        .lean()
    if (idProduct != product._id) {
        return res.status(404).json({ message: "ID sản phẩm không tồn tại" })
    }
    const isCheckQuantityProduct = product.productAttributes.some(item => {
        console.log(item.quantity)
        return item.quantity > 0
    })
    console.log(isCheckQuantityProduct)
    if (isCheckQuantityProduct) {
        return res.status(400).json({
            message: "Không thể xóa sản phẩm này do số lượng vẫn còn"
        })
    }
    next()

}
export { validateAddProduct, validateUpdateProduct, validateDeleteProduct }