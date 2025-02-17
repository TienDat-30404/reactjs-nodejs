import mongoose from 'mongoose';
const Schema = mongoose.Schema
const DiscountSchema = new Schema(
    {
        idProduct: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
        discountValue: { type: Number, required: true },
        endDate : {type : Date, required : true},
        status : {type : Number, default : 1},
        deletedAt : {type : Date, default : null}
    },
    { timestamps: true }

)
const Discount = mongoose.model('Discount', DiscountSchema)
export default Discount
