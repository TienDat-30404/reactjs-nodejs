import mongoose from "mongoose";
const Schema = mongoose.Schema
const DetailReceiptSchema = Schema({
    idReceipt : {type : Schema.Types.ObjectId, ref : 'Receipt'},
    idProduct : {type : Schema.Types.ObjectId, ref : 'Product'},
    idAttribute : {type : Schema.Types.ObjectId, ref : 'Size'},
    priceImport : {type : Number},
    quantity : {type : Number},
    deletedAt : {type : Date, default : null}
})
const DetailReceipt = mongoose.model('DetailReceipt', DetailReceiptSchema)
export default DetailReceipt