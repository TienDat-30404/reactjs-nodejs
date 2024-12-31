const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderDetailSchema = new Schema(
    {
        idOrder : {type: Schema.Types.ObjectId, ref : 'Order'},
        idAttribute : {type: Schema.Types.ObjectId, ref : 'ProductAttribute'},
        quantity : {type : Number},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });



const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail;
