import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ResponseReviewSchema = new Schema(
    {
        idReview : {type : Schema.Types.ObjectId, ref : 'Review'},
        idSupportCustomer : {type : Schema.Types.ObjectId, ref : 'User'},
        reply : {type : String},
        deletedAt : {type : Date, default : null}
    }, 
    {
        timestamps : true
    }
)

const ResponseReview = mongoose.model('ResponseReview', ResponseReviewSchema)
export default ResponseReview
