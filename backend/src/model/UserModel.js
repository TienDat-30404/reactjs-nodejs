const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        name: { type: String, required: true,},
        address : {type : String, default : ''},
        phone : {type : String, default : ''},
        date_of_birth : {type : String, default : ''},
        sex : {type : String, default : ''},
        avatar : {type : String, default : ''},
        idAccount : {type: Schema.Types.ObjectId, required : true, default : 1, ref: 'Account'},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });

// Ẩn trường confirmPassword (không lưu vào db)
UserSchema.pre('save', function (next) {
    if (this.isModified('confirm_password')) {
        this.confirm_password = undefined; // Đảm bảo xóa trường đúng tên
    }
    next();
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
