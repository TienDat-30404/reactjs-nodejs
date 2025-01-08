import express from 'express';
import CategoryController from '../controller/CategoryController.js';
import { validateAddCategory, middlewareUpdateCategory } from '../middlewares/CategoryMiddleWare.js';

const router = express.Router();

router.post('/add-category', validateAddCategory, CategoryController.addCategory)
// router.put('/update-product/:idProduct', validateUpdateProduct, ProductController.updateProduct)
// router.delete('/delete-product/:idProduct', authencationMiddleWare, ProductController.deleteProduct)
router.get('/get-all-category', CategoryController.getAllCategory)
router.get('/detail-category/:_id', CategoryController.detailCategory)
router.put('/update-category/:_id', middlewareUpdateCategory, CategoryController.updateCategory)

export default router