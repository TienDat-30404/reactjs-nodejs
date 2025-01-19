import express from 'express';
import AccountController from '../controller/AccountController.js';
import { conditionLoginMiddleware, shouldUseValidation } from '../utils/validate.js';
import { validateChangePassword, validateSignIn, validateLogin } from '../middlewares/UserMiddleWare.js';
import { conditionChagePasswordMiddleware, shouldUseChangePassword } from '../utils/validate.js';

const router = express.Router();



router.post('/send-otp-signup', validateSignIn, AccountController.sendOtpForCreateAccount)
router.post('/verify-otp-signup', AccountController.verifyOtpForCreateAccount)
router.post('/auth/google', AccountController.authLoginGoogle)
router.post('/sign-in', conditionLoginMiddleware(shouldUseValidation, validateLogin), AccountController.loginUser)
router.put('/change-password/:idAccount', conditionChagePasswordMiddleware(shouldUseChangePassword, validateChangePassword), AccountController.changePassword)

export default router