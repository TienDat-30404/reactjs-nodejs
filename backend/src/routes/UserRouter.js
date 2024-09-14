const express = require('express')
const router = express.Router()

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/utils/uploads/avatar');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const UserController = require('../controller/UserController')
const {validateSignIn, validateLogin, validateUpdateUser} = require('../middlewares/UserMiddleWare')
const authencationMiddleWare = require('../middlewares/authencationMiddleWare')
router.post('/sign-in', validateSignIn, UserController.createUser)
router.post('/sign-up', validateLogin, UserController.loginUser)
router.put('/update-user/:idUser', upload.single('avatar'), validateUpdateUser, UserController.updateUser)
router.delete('/delete-user/:idUser', authencationMiddleWare, UserController.deleteUser)
router.get('/get-all-user', UserController.getAllUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/logout-refresh-token', UserController.logoutRefreshToken)
router.get('/detail-user/:idUser', UserController.detailUser)
// router.post('/refresh-token-update-user', UserController.refreshTokenWhenUpdateUser)
module.exports = router
