import express from 'express';
import { uploadAvatar } from '../utils/multerConfig.js';
import UserController from '../controller/UserController.js';

const router = express.Router();



// router.post('/sign-in',  UserController.createUser)
// router.post('/sign-up', conditionLoginMiddleware(shouldUseValidation, validateLogin), UserController.loginUser)
// router.put('/update-user/:idUser', uploadAvatar.single('avatar'), UserController.updateUser)
router.put('/update-user/:idUser', uploadAvatar.single('avatar'), UserController.updateUser)

router.delete('/delete-user/:idUser', UserController.deleteUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/logout-refresh-token', UserController.logoutRefreshToken)
router.get('/detail-user/:idUser', UserController.detailUser)
router.get('/search-user', UserController.searchUser)
// router.post('/auth/google', UserController.authLoginGoogle)
export default router
