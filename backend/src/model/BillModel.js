const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const BillSchema = new Schema(
    {
        idUser : {type : Number, ref : 'User', required : true},
        idStaff : {type : Number, ref : 'User', default : ''},
        totalPrice : {type : Number, required : true},
        phone : {type : String, required : true},
        address : {type : String, required : true},
        paymentMethod : {type : String, required : true},
        bankAccount : {type : String},
        idBillStatus : {type : Number, default : 1}
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
BillSchema.plugin(AutoIncrement, { inc_field: 'idBill' });

const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;
