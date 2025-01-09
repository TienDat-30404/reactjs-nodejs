import express from 'express';
import PaymentController from '../controller/PaymentController.js';

const router = express.Router();

router.post('/create_payment_url', PaymentController.processPaymentVpn)
router.get('/payment-return', PaymentController.paymentReturn)
export default router