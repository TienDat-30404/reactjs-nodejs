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
const Supplier = mongoose.model('Supplier', SupplierSchema)
export default Supplier