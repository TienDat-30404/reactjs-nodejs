import express from 'express';
import NotificationController from '../controller/NotificationController.js';
import { validateNotificationMiddleWare } from '../middlewares/notificationMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';
const router = express.Router();

router.get('/get-notification-user', authencationMiddleWare, NotificationController.getNotificationOfUser)

router.patch('/read-notification', authencationMiddleWare, NotificationController.readNotification)

router.get('/get-all-notification', authencationMiddleWare, 
checkPermissionRoleMiddleware("notification_search"), NotificationController.getAllNotification)

router.post('/create-notification', authencationMiddleWare, 
checkPermissionRoleMiddleware("notification_add"), validateNotificationMiddleWare, NotificationController.createNotificationForAll)

router.patch('/update-notification/:idNotification', authencationMiddleWare, 
checkPermissionRoleMiddleware("notification_edit"), validateNotificationMiddleWare, NotificationController.updateNotification)

router.delete('/delete-notification/:idNotification', authencationMiddleWare, 
checkPermissionRoleMiddleware("notification_delete"), NotificationController.deleteNotification)

router.patch('/read-notification-common', authencationMiddleWare, NotificationController.readNotificationCommon)
export default router