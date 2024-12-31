const express = require('express')
const router = express.Router()
const VoucherController = require('../controller/VoucherController') 
router.get('/get-voucher-user', VoucherController.getVoucherOfUser)
router.patch('/update-voucher/:_id', VoucherController.updateVoucher)
module.exports = router