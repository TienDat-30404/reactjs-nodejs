import mongoose from 'mongoose';
const Schema = mongoose.Schema
const VoucherSchema = Schema(
    {
        idUser : {type : Schema.Types.ObjectId, ref : 'User'},
        discountVoucher : {type : Number, default : 0.02},
        description : {type : String},
        status : {type : Number, default : 1},
        endDate : {
            type : Date, 
            default : new Date(new Date().setDate(new Date().getDate() + 7))
        },
        deletedAt : {type : Date, default : null}
    }, 
    {
        timestamps : true
    }
)
const Voucher = mongoose.model('Voucher', VoucherSchema)
export default Voucher
