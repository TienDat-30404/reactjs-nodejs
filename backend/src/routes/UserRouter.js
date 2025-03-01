import express from 'express';
import { uploadAvatar } from '../utils/multerConfig.js';
import UserController from '../controller/UserController.js';
import { addUserMiddleWare, updateUserMiddleware } from '../middlewares/UserMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router();


router.get('/get-all-user', authencationMiddleWare, checkPermissionRoleMiddleware('user_search') , UserController.getAllUser)

router.post('/add-user', authencationMiddleWare, checkPermissionRoleMiddleware("user_add"), addUserMiddleWare, UserController.addUser)

router.put('/update-user/:idUser', authencationMiddleWare, checkPermissionRoleMiddleware("user_edit"),
uploadAvatar.single('avatar'), updateUserMiddleware, UserController.updateUser)

router.delete('/delete-user/:idUser', authencationMiddleWare, checkPermissionRoleMiddleware("user_delete"), UserController.deleteUser)

router.post('/refresh-token', UserController.refreshToken)

router.post('/logout-refresh-token', UserController.logoutRefreshToken)

router.get('/detail-user/:idUser', UserController.detailUser)

router.get('/search-user', authencationMiddleWare, checkPermissionRoleMiddleware("user_search"), UserController.searchUser)
// router.post('/auth/google', UserController.authLoginGoogle)
export default router
