import express from 'express';
const router = express.Router()
import CartController from '../controller/CartController.js';

router.post('/add-cart', CartController.addCart)
router.get('/get-all-cart', CartController.getAllCart)
router.delete('/delete-cart/:_id', CartController.deleteCart)
router.put('/update-quantity-cart/:idCart', CartController.updateQuantityCart)
router.get('/get-cart-no-paginated/:idUser', CartController.getAllCartWhichNoPaginated)
export default router