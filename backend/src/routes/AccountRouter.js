const express = require('express')
const router = express.Router()
const AccountController = require('../controller/AccountController')
const {conditionLoginMiddleware, shouldUseValidation} = require('../utils/validate')
const {validateChangePassword} = require('../middlewares/UserMiddleWare')
const {validateSignIn, validateLogin} = require('../middlewares/UserMiddleWare')
const {conditionChagePasswordMiddleware, shouldUseChangePassword} = require('../utils/validate')


router.get('/get-all-user', AccountController.getAllUser)
router.post('/send-otp-signup', validateSignIn, AccountController.sendOtpForCreateAccount)
router.post('/verify-otp-signup', AccountController.verifyOtpForCreateAccount)
router.post('/auth/google', AccountController.authLoginGoogle)
router.post('/sign-in', conditionLoginMiddleware(shouldUseValidation, validateLogin), AccountController.loginUser)
router.put('/change-password/:idAccount', conditionChagePasswordMiddleware(shouldUseChangePassword, validateChangePassword), AccountController.changePassword)

module.exports = router