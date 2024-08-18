const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const BillDetaiSchema = new Schema(
    {
        idBill : {type : Number, ref : 'Bill', required : true},
        idProduct : {type : Number, ref : 'Product', required : true},
        quantity : {type : Number}
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
BillDetaiSchema.plugin(AutoIncrement, { inc_field: 'idBillDetail' });

const BillDetail = mongoose.model('BillDetail', BillDetaiSchema);
module.exports = BillDetail;
