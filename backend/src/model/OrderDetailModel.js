const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderDetailSchema = new Schema(
    {
        idOrder : {type: Schema.Types.ObjectId, ref : 'Order', required : true},
        idProduct : {type: Schema.Types.ObjectId, ref : 'Product', required : true},
        quantity : {type : Number}
    },
    { timestamps: true });



const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail;
