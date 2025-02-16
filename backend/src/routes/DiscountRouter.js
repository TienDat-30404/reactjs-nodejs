import express from 'express';
import DiscountController from '../controller/DiscountController.js';
import { addDiscountMiddleWare, updateDiscountMiddleWare } from '../middlewares/DiscountMiddleWare.js';

const router = express.Router();

router.get('/get-all-discount', DiscountController.getAllDiscount)
router.post('/add-discount', addDiscountMiddleWare, DiscountController.addDiscount)
router.delete('/delete-discount/:id', DiscountController.deleteDiscount)
router.put('/update-discount/:id', updateDiscountMiddleWare, DiscountController.updateDiscount)
export default router