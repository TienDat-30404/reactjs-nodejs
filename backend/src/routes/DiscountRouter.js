import express from 'express';
import DiscountController from '../controller/DiscountController.js';

const router = express.Router();

router.post('/add-discount', DiscountController.addDiscount)
export default router