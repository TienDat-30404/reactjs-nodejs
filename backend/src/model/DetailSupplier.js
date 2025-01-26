import mongoose from "mongoose";
const Schema = mongoose.Schema
const DetailSupplierSchema = Schema(
    {
        idSupplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
        idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
        price : {type : Number},
        deletedAt: { type: Date } 
    },
    {
        timestamps : true
    }
)
const DetailSupplier = mongoose.model('DetailSupplier', DetailSupplierSchema)
export default DetailSupplier