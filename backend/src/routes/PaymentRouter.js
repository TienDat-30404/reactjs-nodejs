import express from 'express';
import PaymentController from '../controller/PaymentController.js';

const router = express.Router();

router.post('/payment-create-vnpay', PaymentController.processPaymentVpn)
router.get('/payment-return-vnpay', PaymentController.paymentVnpReturn)
router.post('/payment-create-zalopay', PaymentController.processPaymentZalopay)
router.post('/payment-callback-zalopay', PaymentController.callbackPaymentZaloPay)
router.post('/payment-check-transaction-zalopay', PaymentController.checkTranSactionZaloPay)
router.post('/payment-create-momo', PaymentController.processPaymentMomo)
router.post('/payment-callback-momo', PaymentController.callbackPaymentMomo)
router.post('/payment-check-transaction-momo', PaymentController.checkTranSactionMomo)
export default router