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
            message : "Delete product Fail"
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
        const getAllProduct = await Product.find({})
        return res.status(200).json({
            getAllProduct
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
        console.log(idProduct)
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