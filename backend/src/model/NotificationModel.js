import mongoose from 'mongoose';
const Schema = mongoose.Schema
const NotificationSchema = new Schema(
    {
        idUser: { type: Schema.Types.ObjectId, ref: 'User', default : undefined },
        content: { type: String },
        type : {type : String, enum: ["all", "personal"]},
        isRead: { type: Boolean},
        readBy: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default : undefined }, 
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps : true
    }
)
const Notification = mongoose.model('Notification', NotificationSchema)
export default Notification
