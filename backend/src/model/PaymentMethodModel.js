import mongoose from "mongoose";
const Schema = mongoose.Schema
const PaymentMethodSchema = Schema(
    {
        name: { type: String },
        code : {type : String},
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps : true
    }
)

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema)

export default PaymentMethod