import express from 'express';
import { uploadAvatar } from '../utils/multerConfig.js';
import UserController from '../controller/UserController.js';
import { addUserMiddleWare, updateUserMiddleware } from '../middlewares/UserMiddleWare.js';

const router = express.Router();


router.get('/get-all-user', UserController.getAllUser)
router.post('/add-user', addUserMiddleWare, UserController.addUser)
router.put('/update-user/:idUser', uploadAvatar.single('avatar'), updateUserMiddleware, UserController.updateUser)
router.delete('/delete-user/:idUser', UserController.deleteUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/logout-refresh-token', UserController.logoutRefreshToken)
router.get('/detail-user/:idUser', UserController.detailUser)
router.get('/search-user', UserController.searchUser)
// router.post('/auth/google', UserController.authLoginGoogle)
export default router
