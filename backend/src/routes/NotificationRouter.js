import express from 'express';
import NotificationController from '../controller/NotificationController.js';
import { validateNotificationMiddleWare } from '../middlewares/notificationMiddleWare.js';
const router = express.Router();

router.get('/get-notification-user', NotificationController.getNotificationOfUser)
router.patch('/read-notification', NotificationController.readNotification)
router.get('/get-all-notification', NotificationController.getAllNotification)
router.post('/create-notification', validateNotificationMiddleWare, NotificationController.createNotificationForAll)
router.patch('/update-notification/:idNotification', validateNotificationMiddleWare, NotificationController.updateNotification)
router.delete('/delete-notification/:idNotification', NotificationController.deleteNotification)
export default router