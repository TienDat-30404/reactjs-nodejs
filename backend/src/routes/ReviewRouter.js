import express from 'express';
import ReviewController from '../controller/ReviewController.js';
import { replyReviewMiddleware } from '../middlewares/ReviewMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router();

router.get('/get-review-of-product/:_id', ReviewController.getAllReviewOfProduct)
router.post('/add-review', authencationMiddleWare, ReviewController.addReview)
router.post('/reply-review', authencationMiddleWare, checkPermissionRoleMiddleware("review_reply"), replyReviewMiddleware, ReviewController.replyReview)
router.get('/get-all-review', authencationMiddleWare, checkPermissionRoleMiddleware("review_search"), ReviewController.getAllReview)
router.patch('/edit-reply-review', authencationMiddleWare, checkPermissionRoleMiddleware("review_reply"), ReviewController.editReplyReview)
router.delete('/delete-review/:id', authencationMiddleWare, checkPermissionRoleMiddleware("review_delete"), ReviewController.deleteReview)
export default router