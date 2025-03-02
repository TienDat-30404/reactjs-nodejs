import express from 'express';
import ReceiptController from '../controller/ReceiptController.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';
const router = express.Router()
router.get('/get-all-receipt', authencationMiddleWare, checkPermissionRoleMiddleware("receipt_search"), ReceiptController.getAllReceipt)
router.post('/add-receipt', authencationMiddleWare, checkPermissionRoleMiddleware("receipt_edit"), ReceiptController.importProduct)
export default router