const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/CategoryController')
const {validateAddCategory, middlewareUpdateCategory} = require('../middlewares/CategoryMiddleWare')
router.post('/add-category', validateAddCategory, CategoryController.addCategory)
// router.put('/update-product/:idProduct', validateUpdateProduct, ProductController.updateProduct)
// router.delete('/delete-product/:idProduct', authencationMiddleWare, ProductController.deleteProduct)
router.get('/get-all-category', CategoryController.getAllCategory)
router.get('/detail-category/:_id', CategoryController.detailCategory)
router.put('/update-category/:_id', middlewareUpdateCategory, CategoryController.updateCategory)

module.exports = router
