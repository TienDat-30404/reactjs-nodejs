import express from 'express';
import SizeController from '../controller/SizeController.js';

const router = express.Router();

router.get('/add-size', SizeController.addSize)
export default router