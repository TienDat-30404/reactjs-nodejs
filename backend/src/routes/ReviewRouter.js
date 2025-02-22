import express from 'express';
import ReviewController from '../controller/ReviewController.js';
import { replyReviewMiddleware } from '../middlewares/ReviewMiddleWare.js';

const router = express.Router();

router.get('/get-review-of-product/:_id', ReviewController.getAllReviewOfProduct)
router.post('/add-review', ReviewController.addReview)
router.post('/reply-review', replyReviewMiddleware, ReviewController.replyReview)
router.get('/get-all-review', ReviewController.getAllReview)
router.patch('/edit-reply-review', ReviewController.editReplyReview)
router.delete('/delete-review/:id', ReviewController.deleteReview)
export default router