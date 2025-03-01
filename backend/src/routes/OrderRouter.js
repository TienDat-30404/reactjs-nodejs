import express from 'express';
import OrderController from '../controller/OrderController.js';
import validateAddOrder from '../middlewares/OrderMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router();

router.post('/add-order', authencationMiddleWare,  validateAddOrder, OrderController.addOrder)
router.get('/orders', authencationMiddleWare, checkPermissionRoleMiddleware("order_search"), OrderController.getAllOrder)
router.get('/detail-order/:idOrder', authencationMiddleWare, OrderController.detailOrder)
router.put('/confirm-order/:idOrder', authencationMiddleWare, checkPermissionRoleMiddleware("order_confirm"), OrderController.confirmOrder)
export default router