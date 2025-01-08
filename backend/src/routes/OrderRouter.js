import express from 'express';
import OrderController from '../controller/OrderController.js';
import validateAddOrder from '../middlewares/OrderMiddleWare.js';

const router = express.Router();

router.post('/add-order', validateAddOrder, OrderController.addOrder)
router.get('/orders', OrderController.getAllOrder)
router.get('/detail-order/:idOrder', OrderController.detailOrder)
router.put('/confirm-order/:idOrder', OrderController.confirmOrder)
export default router