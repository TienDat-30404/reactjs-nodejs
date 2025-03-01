import express from 'express';
import { uploadImageProduct } from '../utils/multerConfig.js';
// import {authencationMiddleWare} from '../middlewares/authencationMiddleWare.js';
import ProductController from '../controller/ProductController.js';
import { validateAddProduct, validateUpdateProduct, validateDeleteProduct } from '../middlewares/ProductMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router();

router.post('/add-product', authencationMiddleWare, checkPermissionRoleMiddleware("product_add"),
uploadImageProduct.single('image'), validateAddProduct, ProductController.addProduct)

router.put('/update-product/:_id', authencationMiddleWare, checkPermissionRoleMiddleware("product_edit"), 
uploadImageProduct.single('image'), validateUpdateProduct, ProductController.updateProduct)

router.delete('/delete-product/:idProduct', 
    authencationMiddleWare,
    checkPermissionRoleMiddleware("product_delete"),
    validateDeleteProduct,
     ProductController.deleteProduct)
     
router.get('/get-all-product', ProductController.getAllProduct)
router.get('/detail-product/:_id', ProductController.getDetailProduct)
router.get('/price', ProductController.getPrice)
export default router