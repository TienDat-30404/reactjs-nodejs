import express from 'express';
import MessageController from '../controller/MessageController.js';

const router = express.Router();

router.post('/add-message', MessageController.addMessage)
router.get('/get-detail-message', MessageController.GetDetailMessage)
export default router