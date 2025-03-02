import express from 'express';
import CategoryController from '../controller/CategoryController.js';
import { validateAddCategory, middlewareUpdateCategory } from '../middlewares/CategoryMiddleWare.js';
import { uploadImageCategory } from '../utils/multerConfig.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';
import { isCheckRole } from '../middlewares/authencationMiddleWare.js';
const router = express.Router();

router.post('/add-category', authencationMiddleWare, checkPermissionRoleMiddleware("category_add"),
uploadImageCategory.single('image'), validateAddCategory, CategoryController.addCategory)

router.put('/update-category/:idCategory', authencationMiddleWare, uploadImageCategory.single('image'),
checkPermissionRoleMiddleware("category_edit"), CategoryController.updateCategory)

router.delete('/delete-category/:idCategory', authencationMiddleWare,
checkPermissionRoleMiddleware("category_delete"), CategoryController.deleteCategory)

router.get('/get-all-category', CategoryController.getAllCategory)

export default router