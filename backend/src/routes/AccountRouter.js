const express = require('express')
const router = express.Router()
const {conditionLoginMiddleware, shouldUseValidation,} = require('../utils/validate')
const {validateSignIn, validateLogin} = require('../middlewares/UserMiddleWare')

const AccountController = require('../controller/AccountController')
router.get('/get-all-user', AccountController.getAllUser)
router.post('/send-otp-signup', validateSignIn, AccountController.sendOtpForCreateAccount)
router.post('/verify-otp-signup', AccountController.verifyOtpForCreateAccount)
router.post('/auth/google', AccountController.authLoginGoogle)
router.post('/sign-in', conditionLoginMiddleware(shouldUseValidation, validateLogin), AccountController.loginUser)
module.exports = router