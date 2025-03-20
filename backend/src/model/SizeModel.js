import mongoose from 'mongoose';
const Schema = mongoose.Schema
const SizeSchema = new Schema(
    {
        name : {type : String },
        sizePriceMultiplier : {type : Number},
        deletedAt : {type : Date, default : null}
    },
    { timestamps: true }
)
const Size = mongoose.model('Size', SizeSchema)


export default Size
