import express from 'express';
import { authenticateToken } from '../middlewares/authencationMiddleWare.js';
import VoucherController from '../controller/VoucherController.js';
import { validateEditVoucher } from '../middlewares/VoucherMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router();

router.get('/get-voucher-user', authenticateToken, VoucherController.getVoucherOfUser)
router.get('/get-all-voucher', authencationMiddleWare, checkPermissionRoleMiddleware("voucher_search"), VoucherController.getAllVoucher)
router.put('/edit-voucher/:_id', validateEditVoucher, checkPermissionRoleMiddleware("voucher_edit"), VoucherController.editVoucher)
export default router