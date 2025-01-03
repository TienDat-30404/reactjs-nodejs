const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../middlewares/authencationMiddleWare')
const VoucherController = require('../controller/VoucherController') 
router.get('/get-voucher-user', authenticateToken, VoucherController.getVoucherOfUser)
router.patch('/update-voucher/:_id', VoucherController.updateVoucher)
module.exports = router