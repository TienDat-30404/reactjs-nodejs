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
        
        const sortBy = req.query.sortBy || "idProduct"
        const type = req.query.type === "asc" ? 1 : -1  // nếu là 1 thì sắp xếp tăng dần và ngược lại
        const objectSort = {}
        objectSort[sortBy] = type
        console.log(objectSort)

        const objectFilter = {}
        if(req.query.idCategory)
        {
            objectFilter.idCategory = req.query.idCategory
        }
        console.log(objectFilter)

        const products = await Product.find(objectFilter)
                                      .skip(startPage)
                                      .limit(limit)
                                      .sort(objectSort)
        const totalProducts = await Product.countDocuments({})
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
module.exports = {addProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct}