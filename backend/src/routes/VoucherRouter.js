import express from 'express';
import { authenticateToken } from '../middlewares/authencationMiddleWare.js';
import VoucherController from '../controller/VoucherController.js';

const router = express.Router();

router.get('/get-voucher-user', authenticateToken, VoucherController.getVoucherOfUser)
router.patch('/update-voucher/:_id', VoucherController.updateVoucher)
router.get('/get-all-voucher', VoucherController.getAllVoucher)
router.delete('/delete-voucher/:_id', VoucherController.deleteVoucher)
router.put('/edit-voucher/:_id', VoucherController.editVoucher)
export default router