import express from 'express'
import PaymentMethodController from '../controller/PaymentMethodController.js'
const router = express.Router()
router.get('/get-all-payment-method', PaymentMethodController.getAllPaymentMethod)
export default router