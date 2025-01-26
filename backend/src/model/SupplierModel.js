import mongoose from "mongoose";
const Schema = mongoose.Schema
const SupplierSchema = Schema(
    {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        email: { type: String },
        deletedAt : {type : Date, default : null}
    },
    {
        timestamps : true
    }
)

SupplierSchema.virtual('supplierDetails', {
    ref : 'DetailSupplier', 
    localField : '_id',
    foreignField : 'idSupplier'
})
const Supplier = mongoose.model('Supplier', SupplierSchema)
export default Supplier