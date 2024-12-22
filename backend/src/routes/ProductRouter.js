const express = require('express')
const router = express.Router()
const {uploadImageProduct} = require('../utils/multerConfig')
const authencationMiddleWare = require('../middlewares/authencationMiddleWare')
const ProductController = require('../controller/ProductController')
const {validateAddProduct, validateUpdateProduct, validateDeleteProduct} = require('../middlewares/ProductMiddleWare')
router.post('/add-product', uploadImageProduct.single('image'), validateAddProduct, ProductController.addProduct)
router.put('/update-product/:_id', uploadImageProduct.single('image'), validateUpdateProduct, ProductController.updateProduct)
router.delete('/delete-product/:idProduct', 
    // authencationMiddleWare,
    validateDeleteProduct,
     ProductController.deleteProduct)
     
router.get('/get-all-product', ProductController.getAllProduct)
router.get('/detail-product/:_id', ProductController.getDetailProduct)
router.get('/price', ProductController.getPrice)
module.exports = router
