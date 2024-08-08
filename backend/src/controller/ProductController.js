const Product = require('../model/ProductModel')
// [GET] /add-product
const addProduct = async (req, res, next) => {
    try 
    {
        const {name, image, price, quantity, idCategory, description } = req.body
        const newProduct = new Product({name, image, price, quantity, idCategory, description})
        await newProduct.save()
        return res.status(200).json(Product)
    }
    catch(error)
    {
        next(error)
    }
}

// [PUT] /update-product/:idProduct
const updateProduct = async (req, res, next) => {
    const idProduct = req.params.idProduct
    const newData = req.body
    await Product.updateOne({idProduct : idProduct}, newData)
    return res.status(200).json({
        message : "Update Successfully"
    })

}

// [DELETE] /delete-product/:idProduct
const deleteProduct = async (req, res, next) => {
    try
    {
        const idProduct = req.params.idProduct
        const delProduct = await Product.deleteOne({idProduct : idProduct})
        if(delProduct.deletedCount > 0)
        {
            return res.status(200).json({
                message : "Delete Product Successfully"
            })
        }
        else 
        {
            return res.status(400).json({
                message : "Delete product Fail"
            })
        }
    }
    catch(error)
    {
        next(error)
    }
    
}

// [GET] /get-all-product
const getAllProduct = async (req, res, next) => {
    try 
    {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const startPage = (page - 1) * limit
        
        const sortBy = req.query.sortBy || 'idProduct'
        const type = req.query.type === "asc" ? 1 : -1  // nếu là 1 thì sắp xếp tăng dần và ngược lại
        const objectSort = {}
        objectSort[sortBy] = type
        console.log(objectSort)
        const objectFilter = {}
        if (req.query.idCategory) {
            objectFilter.idCategory = req.query.idCategory;
        }
    
        if (req.query.search) {
            objectFilter.name = new RegExp(req.query.search, 'i');
        }
    
        if (req.query.priceFrom && req.query.priceTo) {
            const priceFrom = parseFloat(req.query.priceFrom);
            const priceTo = parseFloat(req.query.priceTo);
            objectFilter.price = { $gte: priceFrom, $lte: priceTo };
        }
        const totalProducts = Object.keys(objectFilter).length === 0 
                                ? await Product.countDocuments({}) 
                                : await Product.countDocuments(objectFilter);
        const products = await Product.find(objectFilter)
                                      .skip(startPage)
                                      .limit(limit)
                                      .sort(objectSort)
        const totalPages = Math.ceil(totalProducts / limit)
        return res.status(200).json({
            products,
            page,   
            totalProducts,
            totalPages,
            objectSort
        })
    }
    catch(error)
    {
        next(error)
    }
}

/*
    $eq : so sánh bằng - { field: { $eq: value } }
    $ne : so sánh không bằng - { field: { $ne: value } }
    $gt : so sánh lớn hơn - { field: { $gt: value } }
    $gte : so sánh lớn hơn hoặc bằng - { field: { $gte: value } }
    $lt : so sánh nhỏ hơn - { field: { $lt: value } }
    $lte : so sánh nhỏ hơn - { field: { $lte: value } }
    $in: So sánh nếu giá trị có trong một mảng - { field: { $in: [value1, value2, ...] } }
    $nin: So sánh nếu giá trị không có trong một mảng - { field: { $nin: [value1, value2, ...] } }
    $exists: Kiểm tra sự tồn tại của trường - { field: { $exists: true } }
    $type: Kiểm tra kiểu dữ liệu của trường - { field: { $type: "string" } }
    $regex: So sánh với biểu thức chính quy - { field: { $regex: /pattern/, $options: 'i' } }
    $or: Toán tử logic OR - { $or: [ { field1: value1 }, { field2: value2 } ] }
    $and: Toán tử logic AND - { $and: [ { field1: value1 }, { field2: value2 } ] }
    $not: Toán tử logic NOT - { field: { $not: { $regex: /pattern/ } } }
    $nor: Toán tử logic NOR - { $nor: [ { field1: value1 }, { field2: value2 } ] }
*/

// [GET] /detail-product/:idProduct
const getDetailProduct = async (req, res, next) => {
    try
    {
        const idProduct = req.params.idProduct
        const detailProduct = await Product.findOne({idProduct : idProduct})
        if(detailProduct == null)
        {
            return res.status(400).json({
                message : "Fail Detail Product"
            })
        }
        return res.status(200).json({
            detailProduct
        })
    }
    catch(error)
    {
        next(error)
    }
}

const getPrice = async(req, res, next) => {
    const priceFrom = req.query.priceFrom
    const priceTo = req.query.priceTo
    const result = await Product.find({price : {$gte : priceFrom, $lte : priceTo} })
    const g = await Product.countDocuments({price : {$gte : priceFrom, $lte : priceTo}})
    return res.status(200).json({
        result
    })
}
module.exports = {addProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct, getPrice}