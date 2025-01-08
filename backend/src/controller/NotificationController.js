// const Notification = require('../model/NotificationModel')
import Notification from '../model/NotificationModel.js'
export default class NotificationController {

    static async getNotificationOfUser(req, res, next)  {
        try {
    
            // const idUser = req.user.idUser
            const idUser = req.query.idUser
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.max(1, parseInt(req.query.limit) || 5);
    
            const startPage = (page - 1) * limit
            const [notifications, totalNotification, totalNotificationNotRead] = await Promise.all([
                Notification.find({ idUser, deletedAt: null })
                    .sort({ createdAt: -1 })
                    .skip(startPage)
                    .limit(limit),
                // .select('-deletedAt -updatedAt'),
                Notification.countDocuments({ idUser }),
                Notification.countDocuments({ idUser, isRead: false })
            ])
            const totalPage = Math.ceil(totalNotification / limit)
            return res.status(200).json({
                page,
                limit,
                notifications,
                totalPage,
                totalNotification,
                totalNotificationNotRead
            })
        }
        catch (err) {
            console.error(`Error fetching notifications for user :`, err.message);
            return res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
        }
    
    }
    
    static async readNotification(req, res, next)  {
        try {
            const {idNotification} = req.body
            const response = await Notification.updateOne({ _id: idNotification }, {
                isRead: true
            })
            if (response.modifiedCount > 0) {
                return res.status(200).json({
                    message: 'Read successful',
                    response,
                    status: 200
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                message: 'Fail when read notification'
            })
        }
    
    }
}

