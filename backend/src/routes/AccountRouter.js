const express = require('express')
const router = express.Router()
const AccountController = require('../controller/AccountController')
const {validateSignIn} = require('../middlewares/UserMiddleWare')
router.post('/send-otp-signup', validateSignIn, AccountController.sendOtpForCreateAccount)
router.post('/verify-otp-signup', AccountController.verifyOtpForCreateAccount)
module.exports = router