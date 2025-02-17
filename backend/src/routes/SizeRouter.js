import express from 'express';
import SizeController from '../controller/SizeController.js';
import { addSizeMiddleWare } from '../middlewares/SizeMiddleWare.js';

const router = express.Router();

router.post('/add-size', addSizeMiddleWare, SizeController.addSize)
router.get('/sizes', SizeController.getAllSize)
router.put('/update-size/:id', SizeController.updateSize)
router.delete('/delete-size/:id', SizeController.deleteSize)
export default router