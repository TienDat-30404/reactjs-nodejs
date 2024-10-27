const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const MessageSchema = new Schema(
    {
        idSender : {type : Number, ref : 'User', required : true},
        idReceiver : {type : Number, ref : 'User', required : true},
        content : {type : String, required : true},
        isRead : {type : Boolean, required : true}
    },  
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
MessageSchema.plugin(AutoIncrement, { inc_field: 'idMessage' });

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
