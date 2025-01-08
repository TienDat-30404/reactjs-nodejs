import express from 'express';
import { authenticateToken } from '../middlewares/authencationMiddleWare.js';
import VoucherController from '../controller/VoucherController.js';

const router = express.Router();

router.get('/get-voucher-user', authenticateToken, VoucherController.getVoucherOfUser)
router.patch('/update-voucher/:_id', VoucherController.updateVoucher)
export default router