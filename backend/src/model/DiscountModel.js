const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DiscountSchema = new Schema(
    {
        idProduct: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
        discountValue: { type: Number, required: true },
        endDate : {type : Date, required : true}
    },
    { timestamps: true }

)
const Discount = mongoose.model('Discount', DiscountSchema)
module.exports = Discount;