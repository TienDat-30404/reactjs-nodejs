const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const OrderSchema = new Schema(
    {
        idUser : {type : Number, ref : 'User', required : true},
        idStaff : {type : Number, ref : 'User', default : null},
        totalPrice : {type : Number, required : true},
        phone : {type : String, required : true},
        address : {type : String, required : true},
        paymentMethod : {type : String, required : true},
        bankAccount : {type : String},
        isStatus : {type : String, default : 'Pending' }
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
OrderSchema.plugin(AutoIncrement, { inc_field: 'idOrder' });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
