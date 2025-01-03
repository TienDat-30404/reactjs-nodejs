const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotificationSchema = new Schema(
    {
        idUser: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        isRead: { type: Boolean, default : false },
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps : true
    }
)
const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification