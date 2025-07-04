import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
    {
        idSender : {type: Schema.Types.ObjectId, ref : 'User', required : true},
        idReceiver : {type: Schema.Types.ObjectId, ref : 'User', required : true},
        content : {type : String, required : true},
        isRead : {type : Boolean, required : true},
        deletedAt : {type : Date, default : null}

    },  
    { timestamps: true });



const Message = mongoose.model('Message', MessageSchema);
export default Message
