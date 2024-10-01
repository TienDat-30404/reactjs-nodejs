const express = require('express')
const router = express.Router()
const OrderController = require('../controller/OrderController')
const validateAddOrder = require('../middlewares/OrderMiddleWare')
router.post('/add-order', validateAddOrder, OrderController.addOrder)
router.get('/orders', OrderController.getAllOrder)
router.get('/detail-order/:idOrder', OrderController.detailOrder)
router.put('/confirm-order/:idOrder', OrderController.confirmOrder)
module.exports = router
