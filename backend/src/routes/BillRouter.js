const express = require('express')
const router = express.Router()
const BillController = require('../controller/BillController')
const validateAddBill = require('../middlewares/BillMiddleWare')
router.post('/add-bill', validateAddBill, BillController.addBill)
module.exports = router
