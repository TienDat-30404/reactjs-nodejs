import mongoose from 'mongoose';
import Notification from '../model/NotificationModel.js'
export default class NotificationController {

    static async getNotificationOfUser(req, res, next) {
        try {

            const idUser = req.query.idUser
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.max(1, parseInt(req.query.limit) || 5);

            const query = idUser ? 
            {$or : [ {idUser}, {type : 'all'} ], deletedAt : null} : 
            {type : 'all', deletedAt : null}


            const queryUnread = {
                ...query,
                $or : idUser 
                ? [{idUser, isRead : false}, {type : 'all', readBy : {$not : {$in : [idUser]}}}]
                : [{type : 'all', readBy : {$not : {$in : [idUser]}}}]
            }
            const startPage = (page - 1) * limit
            const [notifications, totalNotification, totalNotificationNotRead] = await Promise.all([
                Notification.find(query)
                    .sort({ createdAt: -1 })
                    .skip(startPage)
                    .limit(limit),

                Notification.countDocuments(query),
                Notification.countDocuments(queryUnread)
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

    static async readNotification(req, res, next) {
        try {
            const { idNotification } = req.body
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

    static async getAllNotification(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const startPage = (page - 1) * limit
        const objectFilter = { deletedAt: null, type: 'all' }
        if(req.query.idNotification)
        {
            if(mongoose.Types.ObjectId.isValid(req.query.idNotification))
            {
                objectFilter._id = req.query.idNotification
            }
            else 
            {
                return res.status(200).json({
                    status : 200,
                    page : 1,
                    totalPage : 1,
                    totalNotification : 0,
                    notifications : [],
                    limit : 1
                })
            }
        }
        if(req.query.content)
        {
            objectFilter.content = { $regex : req.query.content, $options : 'i' }
        }
        const [notifications, totalNotification] = await Promise.all([
            Notification.find(objectFilter)
                .skip(startPage)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Notification.countDocuments(objectFilter)
        ])
        const totalPage = Math.ceil(totalNotification / limit)
        return res.status(200).json({
            status: 200,
            notifications,
            page,
            limit,
            totalPage,
            totalNotification,
            objectFilter
        })
    }

    static async createNotificationForAll(req, res, next) {
        try {
            const { content } = req.body
            const notification = new Notification({
                content,
                type: 'all',
                readBy: []
            })
            console.log(notification)
            await notification.save()
            return res.status(201).json({
                status: 201,
                message: 'Create notification successfully',
                notification
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Fail when create notification'
            })
        }
    }

    static async updateNotification(req, res,next) {
        try {
            const {idNotification} = req.params
            const {content } = req.body
            const notification = await Notification.findByIdAndUpdate({ _id : idNotification }, {
                content
            }, {new : true})
           return res.status(200).json({
                status : 200,
                notification,
                message : 'Update notification successfully'
           })
        }
        catch (error) {
            return res.status(500).json({
                message: `Fail when update notification : ${error.message}`
            })
        }
    }

    static async deleteNotification(req,res, next) {
        try {
            const {idNotification} = req.params
            const response = await Notification.updateOne({ _id : idNotification }, {
                deletedAt : new Date()
            })
            if(response.modifiedCount > 0) {
                return res.status(200).json({
                    status : 200,
                    message : 'Delete notification successfully'
                })
            }
        }
        catch(error) {
            return res.status(500).json({
                status : 500,
                message : `Fail when delete notification : ${error.message}`
            })
        }
    }

    static async readNotificationCommon(req, res, next) {
        try 
        {
            const {idUser, idNotification} = req.body 
            const notification = await Notification.findByIdAndUpdate(idNotification,
                 {$addToSet : {readBy : idUser}},
                 {new : true}
            )
            return res.status(200).json({
                status : 200,
                notification,
                message : "Read successfully"
            })
        }
        catch(err)
        {
            return res.status(500).json({
                message : `Fail when read notification common : ${err}`
            })
        }
        
    }
}

