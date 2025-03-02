import express from 'express';
import DiscountController from '../controller/DiscountController.js';
import { addDiscountMiddleWare, updateDiscountMiddleWare } from '../middlewares/DiscountMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router();

router.get('/get-all-discount', authencationMiddleWare, checkPermissionRoleMiddleware("discount_search"), DiscountController.getAllDiscount)

router.post('/add-discount', authencationMiddleWare, checkPermissionRoleMiddleware("discount_add"),
addDiscountMiddleWare, DiscountController.addDiscount)

router.delete('/delete-discount/:id', authencationMiddleWare, 
checkPermissionRoleMiddleware("discount_delete"), DiscountController.deleteDiscount)

router.put('/update-discount/:id', authencationMiddleWare, 
checkPermissionRoleMiddleware("discount_edit"), updateDiscountMiddleWare, DiscountController.updateDiscount)
export default router