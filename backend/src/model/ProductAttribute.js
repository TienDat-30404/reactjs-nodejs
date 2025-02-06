import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ProductAttributeSchema = new Schema(
    {
        idProduct: { type: Schema.Types.ObjectId, ref: 'Product', },
        idSize: { type: Schema.Types.ObjectId, ref: 'Size', },
        priceImport: { type: Number, default: null },
        priceBought: { type: Number, default: null },
        quantity: { type: Number, default: 0 },
        deletedAt : {type : Date, default : null}
    },
    {
        timestamps : true
    }
    
)

const ProductAttribute = mongoose.model('ProductAttribute', ProductAttributeSchema)
export default ProductAttribute
