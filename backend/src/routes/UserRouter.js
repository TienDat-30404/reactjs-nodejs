const express = require('express')
const router = express.Router()
const {uploadAvatar} = require('../utils/multerConfig')
const UserController = require('../controller/UserController')


// router.post('/sign-in',  UserController.createUser)
// router.post('/sign-up', conditionLoginMiddleware(shouldUseValidation, validateLogin), UserController.loginUser)
router.put('/update-user/:idUser', uploadAvatar.single('avatar'), UserController.updateUser)
router.delete('/delete-user/:idUser', UserController.deleteUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/logout-refresh-token', UserController.logoutRefreshToken)
router.get('/detail-user/:idUser', UserController.detailUser)
router.get('/search-user', UserController.searchUser)
// router.post('/auth/google', UserController.authLoginGoogle)
module.exports = router
