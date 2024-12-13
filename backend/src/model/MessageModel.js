const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
    {
        idSender : {type: Schema.Types.ObjectId, ref : 'User', required : true},
        idReceiver : {type: Schema.Types.ObjectId, ref : 'User', required : true},
        content : {type : String, required : true},
        isRead : {type : Boolean, required : true}
    },  
    { timestamps: true });



const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
