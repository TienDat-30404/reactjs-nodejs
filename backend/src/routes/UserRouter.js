const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const {validateSignIn, validateLogin} = require('../middlewares/validationMiddleWare')
router.get('/sign-in', validateSignIn, UserController.createUser)
router.get('/sign-up', validateLogin, UserController.loginUser)
module.exports = router