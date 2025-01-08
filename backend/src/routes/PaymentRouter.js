import express from 'express';
import PaymentController from '../controller/PaymentController.js';

const router = express.Router();

router.post('/process-payment-vnp', PaymentController.processPaymentVpn)
export default router