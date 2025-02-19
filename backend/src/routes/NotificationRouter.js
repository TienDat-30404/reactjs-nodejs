import express from 'express';
import NotificationController from '../controller/NotificationController.js';
import { authenticateToken } from '../middlewares/authencationMiddleWare.js';
const router = express.Router();

router.get('/get-notification-user', NotificationController.getNotificationOfUser)
router.patch('/read-notification', NotificationController.readNotification)
router.get('/get-all-notification', NotificationController.getAllNotification)
export default router