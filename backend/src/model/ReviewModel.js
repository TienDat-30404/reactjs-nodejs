import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ReviewSchema = new Schema(
    {
        idUser: { type: Schema.Types.ObjectId, ref: 'User' },
        idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
        content: { type: String },
        rating: { type: Number },
        deletedAt : {type : Date, default : null}
    },
    {
        timestamps : true
    }
)

ReviewSchema.virtual('responseReview', {
    ref : 'ResponseReview',
    localField : '_id',
    foreignField : 'idReview'
    
})
const Review = mongoose.model('Review', ReviewSchema)
export default Review
