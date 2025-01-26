import express from 'express';
import ReceiptController from '../controller/ReceiptController.js';
const router = express.Router()
router.get('/get-all-receipt', ReceiptController.getAllReceipt)
router.post('/add-receipt', ReceiptController.importProduct)
export default router