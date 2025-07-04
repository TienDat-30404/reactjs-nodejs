import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const OrderDetailSchema = new Schema(
    {
        idOrder : {type: Schema.Types.ObjectId, ref : 'Order'},
        idProductAttribute : {type: Schema.Types.ObjectId, ref : 'ProductAttribute'},
        quantity : {type : Number},
        unitPrice : {type : Number},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });



const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
export default OrderDetail
