const Notification = require('../model/NotificationModel')
const getNotificationOfUser = async (req, res, next) => {
    try {

        const idUser = req.user.idUser
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 100);

        const startPage = (page - 1) * limit
        const [notifications, totalNotification] = await Promise.all([
            Notification.find({ idUser, deletedAt: null })
                .skip(startPage)
                .limit(limit),
                // .select('-deletedAt -updatedAt'),
            Notification.countDocuments({ idUser })
        ])
        const totalPage = Math.ceil(totalNotification / limit)
        return res.status(200).json({
            page,
            limit,
            notifications,
            totalPage,
            totalNotification
        })
    }
    catch (err) {
        console.error(`Error fetching notifications for user ${idUser}:`, err.message);
        return res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
    }

}

const readNotification = async(req, res, next) => {
    try 
    { 
        const idNotification = req.query.idNotification
        const response = await Notification.updateOne({_id : idNotification}, {
            isRead : true
        })
        if(response.modifiedCount > 0)
        {
            return res.status(200).json({
                message : 'Read successful',
                response,
                status : 200
            })
        }
    }
    catch(error)
    {
        return res.status(500).json({
            message : 'Fail when read notification'
        })
    }

}

module.exports = {getNotificationOfUser, readNotification}