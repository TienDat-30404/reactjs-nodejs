const express = require('express')
const router = express.Router()
const CartController = require('../controller/CartController')
router.post('/add-cart', CartController.addCart)
router.get('/get-all-cart', CartController.getAllCart)
// router.get('/detail-category/:idCategory', CategoryController.detailCategory)
module.exports = router
