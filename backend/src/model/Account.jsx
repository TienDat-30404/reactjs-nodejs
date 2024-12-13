const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        name: { type: String, required: true,},

        email: {type: String, required: true, unique: true,},

        password: { type: String, default : ''},

        confirm_password: {type: String, default : ''},
        address : {type : String, default : ''},
        phone : {type : String, default : ''},
        date_of_birth : {type : String, default : ''},
        sex : {type : String, default : ''},
        avatar : {type : String, default : ''},
        idRole : {type: Schema.Types.ObjectId, required : true, default : 1, ref: 'Role'}
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
