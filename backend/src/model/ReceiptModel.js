import mongoose from "mongoose";
const Schema = mongoose.Schema
const ReceiptSchema = Schema(
    {
        idUser: { type: Schema.Types.ObjectId, ref: 'User' },
        name : {type : String},
        idSupplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
        totalPrice: { type: Number },
        deletedAt : {type : Date, default : null}
    },
    {
        timestamps : true
    }
)


ReceiptSchema.virtual('receiptDetails', {
    ref : 'DetailReceipt', 
    localField : '_id',
    foreignField : 'idReceipt'
})

const Receipt = mongoose.model("Receipt", ReceiptSchema)
export default Receipt