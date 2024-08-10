const express = require('express')
const router = express.Router()
const CartController = require('../controller/CartController')
router.post('/add-cart', CartController.addCart)
router.get('/get-all-cart', CartController.getAllCart)
router.delete('/delete-cart/:idCart', CartController.deleteCart)
router.put('/update-quantity-cart/:idCart', CartController.updateQuantityCart)
module.exports = router
