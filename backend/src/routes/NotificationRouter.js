const express = require('express')
const router = express.Router()
const NotificationController = require('../controller/NotificationController')
const { authenticateToken } = require('../middlewares/authencationMiddleWare')
router.get('/get-notification-user', NotificationController.getNotificationOfUser)
router.patch('/read-notification', NotificationController.readNotification)
module.exports = router