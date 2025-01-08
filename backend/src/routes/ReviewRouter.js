import express from 'express';
import ReviewController from '../controller/ReviewController.js';

const router = express.Router();

router.get('/review/:_id', ReviewController.reviewProduct)
router.post('/add-review', ReviewController.addReview)
router.post('/reply-review', ReviewController.replyReview)
export default router