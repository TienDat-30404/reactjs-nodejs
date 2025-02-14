import express from 'express';
import DiscountController from '../controller/DiscountController.js';
import { addDiscountMiddleWare } from '../middlewares/DiscountMiddleWare.js';

const router = express.Router();

router.get('/get-all-discount', DiscountController.getAllDiscount)
router.post('/add-discount', addDiscountMiddleWare, DiscountController.addDiscount)
export default router