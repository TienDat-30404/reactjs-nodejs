import express from 'express';
import SizeController from '../controller/SizeController.js';

const router = express.Router();

router.post('/add-size', SizeController.addSize)
router.get('/sizes', SizeController.getAllSize)
export default router