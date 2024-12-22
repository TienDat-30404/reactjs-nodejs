const express = require('express')
const router = express.Router()
const DiscountController = require('../controller/DiscountController')
router.post('/add-discount', DiscountController.addDiscount)
module.exports = router