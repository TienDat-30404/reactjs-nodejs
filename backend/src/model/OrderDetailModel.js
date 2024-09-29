const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const OrderDetailSchema = new Schema(
    {
        idOrder : {type : Number, ref : 'Order', required : true},
        idProduct : {type : Number, ref : 'Product', required : true},
        quantity : {type : Number}
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
OrderDetailSchema.plugin(AutoIncrement, { inc_field: 'idOrderDetail' });

const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail;
