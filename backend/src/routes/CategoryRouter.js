import express from 'express';
import CategoryController from '../controller/CategoryController.js';
import { validateAddCategory, middlewareUpdateCategory } from '../middlewares/CategoryMiddleWare.js';
import { uploadImageCategory } from '../utils/multerConfig.js';
const router = express.Router();

router.post('/add-category', uploadImageCategory.single('image'), validateAddCategory, CategoryController.addCategory)
router.put('/update-category/:idCategory', uploadImageCategory.single('image'), CategoryController.updateCategory)
router.delete('/delete-category/:idCategory', CategoryController.deleteCategory)
router.get('/get-all-category', CategoryController.getAllCategory)
router.get('/detail-category/:_id', CategoryController.detailCategory)

export default router