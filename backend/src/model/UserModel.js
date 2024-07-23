const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new Schema(
    {
        name: { type: String, required: true,},

        email: {type: String, required: true, unique: true,},

        password: { type: String, required: true,},

        confirm_password: {type: String, required: true,},
        idRole : {type : Number, required : true, default : 0}
    },
    { timestamps: true });

// Ẩn trường confirmPassword (không lưu vào db)
UserSchema.pre('save', function (next) {
    if (this.isModified('confirm_password')) {
        this.confirm_password = undefined; // Đảm bảo xóa trường đúng tên
    }
    next();
});

// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
UserSchema.plugin(AutoIncrement, { inc_field: 'idUser' });

const User = mongoose.model('User', UserSchema);
module.exports = User;
