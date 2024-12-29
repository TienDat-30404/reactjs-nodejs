const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VoucherSchema = Schema(
    {
        idUser : {type : Schema.Types.ObjectId, ref : 'User'},
        discountVoucher : {type : Number, default : 0.02},
        description : {type : String},
        deletedAt : {type : Date, default : null}
    }, 
    {
        timestamps : true
    }
)
const Voucher = mongoose.model('Voucher', VoucherSchema)
module.exports = Voucher