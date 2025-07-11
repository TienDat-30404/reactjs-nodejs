import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {
        idUser : {type: Schema.Types.ObjectId, ref : 'User', required : true},
        idStaff : {type: Schema.Types.ObjectId, ref : 'User', default : null},
        idVoucher : {type : Schema.Types.ObjectId, ref : 'Voucher', default : null},
        totalPrice : {type : Number, required : true},
        phone : {type : String, required : true},
        address : {type : String, required : true},
        idPaymentMethod : {type : Schema.Types.ObjectId, ref : 'PaymentMethod'},
        idStatus : {type : Schema.Types.ObjectId, ref : 'Status'},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });

OrderSchema.virtual('orderDetails', {
    ref : 'OrderDetail', 
    localField : '_id',
    foreignField : 'idOrder'
})

const Order = mongoose.model('Order', OrderSchema);
export default Order
